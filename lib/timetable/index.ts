import { Prisma } from '@prisma/client';
import hash from 'object-hash';
import { z } from 'zod';

import { prisma } from '../prisma';

import { Timetable } from './types';
import { randomString } from './utils';

type TimetableResponse = z.infer<typeof Timetable>;
type Courses = TimetableResponse['courses'];

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
          lectures: true,
          labs: true,
          tutorials: true,
          course: true,
        },
      },
    },
  });
  if (!timetable) return null;

  return {
    courses: timetable.courses.map((course) => ({
      subject: course.course.subject,
      code: course.course.code,
      pid: course.course.pid,
      color: course.color ?? defaultColor,
      lecture: course.lectures.length > 0 ? course.lectures : [],
      lab: course.labs.length > 0 ? course.labs : [],
      tutorial: course.tutorials.length > 0 ? course.tutorials : [],
    })),
    // is the timetable term was inserted then it had to pass validation
    term: timetable.term as any,
  };
}

export async function addTimetable(courses: Courses, term: string): Promise<string | null> {
  const timetableHash = hash({ ...courses, term }, { unorderedArrays: true });
  // check if the same timetable already exists in the database
  const existingTimetable = await prisma.timetable.findFirst({
    where: {
      hash: timetableHash,
    },
  });

  // if it does then return the existing timetable slug
  if (existingTimetable) return existingTimetable.ref;

  // create a set of keys in which we're interested in checking if they exist in the database
  const keys = courses.map(({ subject, code }) => [subject, code]);
  // woo sql~ :D
  const result = await prisma.$queryRaw<
    {
      id: string;
      subject: string;
      code: string;
    }[]
  >`
    SELECT id,subject,code FROM "Course" WHERE term = ${term} AND (subject,code) IN (${Prisma.join(keys)})`;
  // Prisma.join safely joins an array of strings to a comma-separated string for SQL
  // In this query we look for courses that match the keys in the keys array and return them
  // This makes sure we only send one query to check for courses.

  if (result.length !== courses.length) return null;

  // map for hash join (map the db course id to input courses)
  const m = new Map<string, string>(result.map(({ id, subject, code }) => [`${subject}${code}`, id]));

  const slug = randomString(12);

  // insert into database
  await prisma.timetable.create({
    data: {
      hash: timetableHash,
      ref: slug,
      term,
      courses: {
        createMany: {
          data: courses.map((course) => {
            const id = m.get(`${course.subject}${course.code}`);
            if (!id) throw new Error('course not found');
            return {
              courseId: id,
              pid: course.pid,
              color: course.color ?? defaultColor,
              lectures: course.lecture ? course.lecture : [],
              labs: course.lab ? course.lab : [],
              tutorials: course.tutorial ? course.tutorial : [],
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
