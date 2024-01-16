import { Course, Faculty, Prisma } from '@prisma/client';

import { fetchCourses, fetchCourseDetailsByPid } from '../kuali';
import { prisma } from '../prisma';

import { CourseDetails } from './types';

export async function getCourseDetailByPid(term: string, pid: string) {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      pid: pid,
    },
  });
  return course;
}

export async function upsertCourses(term: string) {
  const courses = await fetchCourses(term);
  console.log('fetched all courses', courses.length);
  for (let i = 0; i<courses.length; i++) {
    const course = courses[i];
    console.log('upserting course', course.subject, course.code)
    const details = await fetchCourseDetailsByPid(term, course.pid);
    const data = {
      pid: details.pid,
      term,
      subject: course.subject,
      subjectDescription: details.subjectCode.description.replace(`(${course.subject})`, ''),
      code: course.code,
      title: details.title,
      description: details.description,
      dateStart: details.dateStart,
      credits: details.credits,
      hoursCatalog: details.hoursCatalog,
      preAndCorequisites: details.preAndCorequisites,
      preOrCorequisites: details.preOrCorequisites,
      formally: details.formerlyNotesText,
    };
    await prisma.course.upsert({
      where: {
        // eslint-disable-next-line camelcase
        term_subject_code: {
          term: term,
          subject: course.subject,
          code: course.code,
        },
      },
      create: data,
      update: data,
    });
  }
}

export async function getFacultyIds(emails: string[]) {
  // create a set of keys in which we're interested in checking if they exist in the database
  // woo sql~ :D
  const result = await prisma.$queryRaw<Pick<Faculty, 'id' | 'email'>[]>`
    SELECT DISTINCT id,email FROM "Faculty" WHERE email IN (${Prisma.join(emails)})`;
  // Prisma.join safely joins an array of strings to a comma-separated string for SQL
  // In this query we look for courses that match the keys in the keys array and return them
  // This makes sure we only send one query to check for courses.

  // map for hash join (map the db course id to input courses)
  const mapping = new Map<string, string>(result.map(({ id, email }) => [email, id]));
  return mapping;
}

export async function getCourseIds(courses: { subject: string; code: string }[], term: string) {
  // create a set of keys in which we're interested in checking if they exist in the database
  // woo sql~ :D
  const result = await prisma.$queryRaw<Pick<Course, 'id' | 'subject' | 'code'>[]>`
    SELECT DISTINCT id,subject,code FROM "Course" WHERE (subject,code) IN 
      (${Prisma.join(courses.map(({ subject, code }) => Prisma.sql`(${subject}, ${code})`))})
    AND term = ${term}`;
  // Prisma.join safely joins an array of strings to a comma-separated string for SQL
  // In this query we look for courses that match the keys in the keys array and return them
  // This makes sure we only send one query to check for courses.

  // map for hash join (map the db course id to input courses)
  const mapping = new Map<string, string>(result.map(({ id, subject, code }) => [`${subject}${code}`, id]));
  return mapping;
}

type CourseResponse = {
  pid: string;
  title: string;
  subject: string;
  code: string;
};

export async function getCourses(term: string): Promise<CourseResponse[]> {
  const courses = await prisma.course.findMany({
    where: {
      term: term,
    },
    select: {
      pid: true,
      title: true,
      subject: true,
      code: true,
    },
    orderBy: {
      code: 'asc',
    },
  });
  return courses;
}

export async function getCoursesInSession(term: string): Promise<CourseResponse[]> {
  const courses = await prisma.$queryRaw<Pick<Course, 'id' | 'title' | 'subject' | 'code' | 'pid'>[]>`
    SELECT DISTINCT "Course".id,"Course".title,subject,code,pid FROM "Course" 
      INNER JOIN "Section" ON "Course".id = "Section"."courseId" 
      WHERE "Course".term = ${term} ORDER BY subject, code
  `;
  return courses;
}

const toCourseResponse = (course: Course): CourseDetails => ({
  ...course,
  credits: course.credits as any,
  hoursCatalog: course.hoursCatalog as any,
  preAndCorequisites: course.preAndCorequisites as any,
  preOrCorequisites: course.preOrCorequisites as any,
  subject: course.subject,
  code: course.code,
  description: course.description,
  dateStart: course.dateStart,
  formally: course.formally ? course.formally : undefined,
  pid: course.pid,
  title: course.title,
});

export async function getCourseByPid(term: string, pid: string): Promise<CourseDetails> {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      pid: pid,
    },
  });

  if (!course) throw new Error(`course not found: ${term} ${pid}`);

  return toCourseResponse(course);
}

export async function getCourseBySubjectCode(term: string, subject: string, code: string): Promise<CourseDetails> {
  const course = await prisma.course.findFirst({
    where: {
      term: term,
      subject: subject,
      code: code,
    },
  });

  if (!course) throw new Error(`course not found: ${term} ${subject} ${code}`);

  return toCourseResponse(course);
}
