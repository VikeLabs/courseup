import { Prisma } from '@prisma/client';
import hash from 'object-hash';
import { z } from 'zod';

import { prisma } from '../prisma';
import { Term } from '../term';

import { Timetable } from './types';
import { randomString } from './utils';

type TimetableResponse = z.infer<typeof Timetable>;

type Courses = TimetableResponse['courses'];

type SectionWithCourse = {
  id: string;
  subject: string;
  code: string;
  sequenceNumber: string;
};

const defaultColor = '#f5f5f5';

export async function getTimetable(slug: string): Promise<TimetableResponse | null> {
  const timetable = await prisma.timetable.findFirst({
    where: {
      ref: slug,
    },
    include: {
      courses: {
        select: {
          color: true,
          section: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });
  if (!timetable) return null;

  const courses = timetable.courses.reduce(
    (acc, c) => {
      const course = acc.get(c.section.course.id);
      if (!course) {
        acc.set(c.section.course.id, {
          subject: c.section.course.subject,
          code: c.section.course.code,
          pid: c.section.course.pid,
          color: c.color ?? defaultColor,
          lecture: c.section?.scheduleTypeDescription === 'Lecture' ? [c.section.sequenceNumber] : [],
          lab: c.section?.scheduleTypeDescription === 'Lab' ? [c.section.sequenceNumber] : [],
          tutorial: c.section?.scheduleTypeDescription === 'Tutorial' ? [c.section.sequenceNumber] : [],
        });
        return acc;
      }

      if (c.section?.scheduleTypeDescription === 'Lecture') course.lecture.push(c.section.sequenceNumber);
      if (c.section?.scheduleTypeDescription === 'Lab') course.lab.push(c.section.sequenceNumber);
      if (c.section?.scheduleTypeDescription === 'Tutorial') course.tutorial.push(c.section.sequenceNumber);

      return acc;
    },
    new Map<
      string,
      {
        subject: string;
        code: string;
        pid: string;
        color: string;
        lecture: string[];
        tutorial: string[];
        lab: string[];
      }
    >()
  );

  return {
    courses: Array.from(courses.values()),
    // is the timetable term was inserted then it had to pass validation
    term: timetable.term as any,
  };
}

export async function addTimetable(courses: Courses, term: Term): Promise<string | null> {
  const timetableHash = hash({ ...courses, term }, { unorderedArrays: true });
  // check if the same timetable already exists in the database
  const existingTimetable = await prisma.timetable.findFirst({
    where: {
      hash: timetableHash,
    },
  });

  // if it does then return the existing timetable slug
  if (existingTimetable) return existingTimetable.ref;

  // prepare for sql query by flattening the courses array
  const sections = courses.flatMap((course) => {
    const base = {
      subject: course.subject,
      code: course.code,
    };
    const lectures = course.lecture?.map((sequenceNumber) => ({ ...base, sequenceNumber }));
    const labs = course.lab?.map((sequenceNumber) => ({ ...base, sequenceNumber }));
    const tutorials = course.tutorial?.map((sequenceNumber) => ({ ...base, sequenceNumber }));
    return [...(lectures ?? []), ...(labs ?? []), ...(tutorials ?? [])];
  });

  // eg. (subject, code, sequenceNumber) IN (('CSC', '111', 'A01'), ('CSC', '111', 'B01'))
  const subjectCodeSeqTuples = sections.map(
    ({ subject, code, sequenceNumber }) => Prisma.sql`(${subject}, ${code}, ${sequenceNumber})`
  );

  const result = await prisma.$queryRaw<SectionWithCourse[]>`
    SELECT "Section"."id",subject,code,"Section"."sequenceNumber" FROM "Section"
    LEFT JOIN "Course" ON "Course".id = "Section"."courseId"
    WHERE (subject,code,"sequenceNumber") IN (${Prisma.join(subjectCodeSeqTuples)});
  `;

  // if the query returns less than the number of sections then some of the sections/courses are invalid
  if (result.length !== sections.length) return null;

  // slug is for the url
  const slug = randomString(12);

  // insert into database
  await prisma.timetable.create({
    data: {
      hash: timetableHash,
      ref: slug,
      term: term.toString(),
      courses: {
        createMany: {
          data: result.map((section) => {
            // can only have one color associated with a course within a timetable
            const color = courses.find((c) => c.subject === section.subject && c.code === section.code)?.color;
            return {
              sectionId: section.id,
              color: color ?? defaultColor,
              updatedAt: new Date(),
            };
          }),
        },
      },

      updatedAt: new Date(),
    },
  });
  return slug;
}
