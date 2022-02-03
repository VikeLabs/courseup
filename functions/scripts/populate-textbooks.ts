import * as admin from 'firebase-admin';
import { CookieJar } from 'tough-cookie';
import { textbookExtractor } from '@vikelabs/uvic-course-scraper/dist/pages/bookstore';
import cheerio from 'cheerio';
import got from 'got';
import { batch } from 'typesaurus';
import { TextbooksCollection } from '../src/db/collections';

// to allow this script to run locally without fudging things around
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({
    projectId: 'development',
  });
} else {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

if (process.argv.length != 3) throw Error('Term argument not found.');

const term = process.argv[2];

if (!/20\d{2}0[1,5,9]/.test(term.trim()))
  throw Error('Invalid term argument format');

const main = async () => {
  const courses = await got(
    'http://www.uvicbookstore.ca/api/open/v1/courses'
  ).json<
    {
      id: number;
      dept: string;
      code: string;
      section: string;
    }[]
  >();

  const depts = new Set(courses.map((c) => c.dept));
  Array.from(depts).forEach(async (dept) => {
    const cookieJar = new CookieJar();
    const ids = courses.filter((c) => c.dept === dept).map((c) => `${c.id}`);

    await got.post('http://www.uvicbookstore.ca/text/', {
      cookieJar,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodeURI(`method=course${ids.map((c) => `&course[]=${c}`)}`),
    });

    const $ = cheerio.load(
      (
        await got('http://www.uvicbookstore.ca/text/search/results', {
          cookieJar,
        })
      ).body
    );

    const textbooks = textbookExtractor($);

    // want to store the textbook data in the same course document
    const groups = Array.from(
      new Set(textbooks.map((t) => t.subject + '_' + t.code))
    );
    const { set, commit } = batch();
    groups.forEach((x) => {
      const courses = textbooks.filter(
        (t) => t.subject + '_' + t.code === x && t.textbooks.length > 0
      );
      if (courses.length > 0) {
        const { subject, code } = courses[0];
        const key = `${term}${subject}${code}`;
        set(TextbooksCollection, key, {
          subject,
          code,
          term,
          sections: courses.map(
            ({ section, additionalInfo, instructor, textbooks }) => ({
              section,
              additionalInfo,
              instructor,
              textbooks,
            })
          ),
        });
      }
    });
    await commit();
  });
};

main();
