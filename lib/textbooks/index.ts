import { PrismaPromise, TextbookSource } from '@prisma/client';
import { load } from 'cheerio';
import makeFetchCookie from 'fetch-cookie';
import { isbn } from 'simple-isbn';
import { z } from 'zod';

import { prisma } from '../prisma';
import { textbookExtractor } from '../scraper';

import { CourseTextbookList, Textbook } from './types';
import { CourseTextbook } from './validation';

const isbnCache = new Map<string, boolean>();

export function parsePrice(price: string): number {
  // parse $1.00 (dollars) into 100 (cents)
  return parseInt(price.replace(/[^0-9]/g, ''), 10);
}

export async function fetchTextbooks() {
  // get main list of courses with textbooks
  const response = await fetch('https://www.uvicbookstore.ca/api/open/v1/courses');
  const raw = await response.json();
  // validation
  const courses = await z.array(CourseTextbook).parseAsync(raw);

  const departments = new Set(courses.map((c) => c.dept));

  const textbooks = await Promise.all(
    Array.from(departments).map(async (d) => {
      // per-department fetch (cookie) instance
      const fc = makeFetchCookie(fetch);
      const ids = courses.filter((c) => c.dept === d).map((c) => `${c.id}`);
      await fc('https://www.uvicbookstore.ca/text/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeURI(`method=course${ids.map((c) => `&course[]=${c}`)}`),
      });
      // fetch the textbooks
      const res = await fc('https://www.uvicbookstore.ca/text/search/results');
      // parse the HTML
      return textbookExtractor(load(await res.text()));
    })
  );
  // flatten
  return textbooks.flatMap((t) => t);
}

type CourseTextbooks = ReturnType<typeof textbookExtractor>;

export async function checkAmazon(isbn10: string): Promise<boolean> {
  // constuct url
  const amazonUrl = `https://www.amazon.ca/dp/${isbn10}`;
  // check if we've already checked this ISBN
  const cache = isbnCache.get(isbn10);
  if (cache !== undefined) return cache;

  try {
    const res = await fetch(amazonUrl);
    // fix: insufficient for determining if available on amazon at all
    const isAvailableOnAmazon = res.status !== 404;
    isbnCache.set(isbn10, isAvailableOnAmazon);
    return isAvailableOnAmazon;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function extendTextbooks(textbooks: CourseTextbooks): Promise<CourseTextbookList<Textbook>[]> {
  // append addtional info to the existing list
  return Promise.all(
    textbooks.flatMap(async (books) => ({
      ...books,
      textbooks: await Promise.all(
        books.textbooks.flatMap(async (textbook) => {
          // get around weird type error
          const i = textbook.isbn || '';
          if (!isbn.isValidIsbn(i)) return textbook;
          const isbn10 = isbn.toIsbn10(i);
          const isAvailableOnAmazon = await checkAmazon(isbn10);

          return {
            ...textbook,
            isbn10,
            amazonUrl: isAvailableOnAmazon ? `https://www.amazon.ca/dp/${isbn10}` : undefined,
          };
        })
      ),
    }))
  );
}

type PriceKey = keyof Textbook['price'];

const BookstoreSources: { key: PriceKey; format: string; condition: string }[] = [
  {
    key: 'newCad',
    format: 'physical',
    condition: 'new',
  },
  {
    key: 'usedCad',
    format: 'physical',
    condition: 'used',
  },
  {
    key: 'digitalAccessCad',
    format: 'digital',
    condition: 'new',
  },
  {
    key: 'newAndDigitalAccessCad',
    format: 'digital+physical',
    condition: 'new',
  },
];
export async function upsertBookstoreTextbookSources(id: string, textbook: Textbook) {
  if (!textbook.bookstoreUrl) return;

  const transactions: PrismaPromise<any>[] = [
    prisma.textbookSource.deleteMany({
      where: {
        textbookId: id,
        org: 'uvic',
      },
    }),
  ];

  for (const { key, condition, format } of BookstoreSources) {
    const price = textbook.price[key];
    if (!price) continue;
    transactions.push(
      prisma.textbookSource.create({
        data: {
          org: 'uvic',
          url: textbook.bookstoreUrl,
          condition,
          format,
          price: parsePrice(price),
          updatedAt: new Date(),
          textbookId: id,
        },
      })
    );
  }

  await prisma.$transaction(transactions);
}

export async function upsertAmazonTextbookSource(id: string, textbook: Textbook) {
  if (!textbook.amazonUrl) return;
  const amazonInput = {
    org: 'amazon',
    url: textbook.amazonUrl,
    updatedAt: new Date(),
    textbookId: id,
  };

  await prisma.$transaction([
    prisma.textbookSource.deleteMany({
      where: {
        textbookId: id,
        org: 'amazon',
        format: {
          equals: null,
        },
        condition: {
          equals: null,
        },
      },
    }),
    prisma.textbookSource.create({
      data: amazonInput,
    }),
  ]);
}

export async function upsertTextbookSources(id: string, textbook: Textbook) {
  return Promise.all([upsertBookstoreTextbookSources(id, textbook), upsertAmazonTextbookSource(id, textbook)]);
}

export async function getSectionId(term: string, subject: string, code: string, section?: string) {
  const res = await prisma.section.findFirst({
    where: {
      course: {
        term,
        subject,
        code,
      },
      sequenceNumber: section,
    },
    select: {
      id: true,
    },
  });
  return res?.id;
}

export async function upsertTextbook(term: string, course: CourseTextbookList<Textbook>) {
  // check existence of the course/section the textbook list is associated with
  const section = await getSectionId(term, course.subject, course.code, course.section);
  if (!section) return;

  const textbooksIds = await Promise.all(
    course.textbooks.map(async (textbook) => {
      if (!textbook.isbn) return null;
      const data = {
        title: textbook.title,
        isbn: textbook.isbn,
        isbn10: textbook.isbn10,
        updatedAt: new Date(),
        author: textbook.authors,
      };
      let t;
      try {
        t = await prisma.textbook.upsert({
          where: {
            isbn: textbook.isbn,
          },
          create: data,
          update: data,
        });
      } catch (e) {
        console.error(e);
        return null;
      }

      await upsertTextbookSources(t.id, textbook);

      return {
        textbookId: t.id,
        required: textbook.required,
      };
    })
  );

  const ids = textbooksIds
    .filter((i) => i !== null)
    .map((i) => ({
      textbookId: i?.textbookId as string,
      required: i?.required,
    }));

  try {
    await prisma.textbookList.delete({
      where: {
        sectionId: section,
      },
    });
  } catch (e) {
    console.error(e);
  }

  await prisma.textbookList.create({
    data: {
      sectionId: section,
      addtionalInformation: course.additionalInfo?.join('\n'),
      textbooks: {
        createMany: {
          data: ids.map((i) => ({
            textbookId: i.textbookId,
            required: i.required,
          })),
          skipDuplicates: true,
        },
      },
    },
  });
}

export async function upsertTextbooks(term: string) {
  const courses = await fetchTextbooks();
  // extend the textbooks with additional info, filter
  const extended = await extendTextbooks(courses.filter((t) => t.textbooks.length > 0));
  // upsert the textbooks
  for (const c of extended) {
    await upsertTextbook(term, c);
  }
}

export async function getTextbooks(
  term: string,
  subject: string,
  code: string
): Promise<{ subject: string; code: string; term: string; sections: CourseTextbookList<Textbook>[] }> {
  const course = await prisma.course.findFirst({
    where: {
      subject,
      code,
      term,
    },
    include: {
      sections: {
        include: {
          textbooks: {
            include: {
              textbooks: {
                include: {
                  textbook: {
                    include: {
                      sources: true,
                    },
                  },
                },
              },
            },
          },
          faculty: {
            include: {
              faculty: true,
            },
          },
        },
      },
    },
  });

  return {
    subject,
    code,
    term,
    sections:
      course?.sections
        ?.map((s) => ({
          subject: course.subject,
          code: course.code,
          section: s.sequenceNumber,
          instructor: s.faculty.map((f) => f.faculty.name).join(','),
          textbooks:
            s.textbooks?.textbooks?.flatMap<Textbook>(({ textbook, required }) => {
              const uvic = textbook.sources?.find((s) => s.org === 'uvic');
              const amazon = textbook.sources?.find((s) => s.org === 'amazon');
              return {
                title: textbook.title,
                isbn: textbook.isbn ? textbook.isbn : undefined,
                isbn10: textbook.isbn10 ? textbook.isbn10 : undefined,
                amazonUrl: amazon?.url,
                bookstoreUrl: uvic?.url,
                authors: textbook.author,
                price: buildBookstorePrices(textbook.sources),
                required: required,
              };
            }) ?? [],
        }))
        .filter((t) => t.textbooks.length > 0) ?? [],
  };
}

export async function buildBookstorePrices(sources: TextbookSource[]) {
  const uvic = sources?.filter((s) => s.org === 'uvic');

  const digitalAccessCad = uvic.find((s) => s.format === 'digital' && s.condition === 'new');
  const newCad = uvic.find((s) => s.format === 'phyiscal' && s.condition === 'new');
  const newAndDigitalAccessCad = sources.find((s) => s.format === 'digital+physical' && s.condition === 'new');
  const usedCad = uvic.find((s) => s.format === 'phyiscal' && s.condition === 'used');

  return {
    digitalAccessCad,
    newCad,
    newAndDigitalAccessCad,
    usedCad,
  };
}
