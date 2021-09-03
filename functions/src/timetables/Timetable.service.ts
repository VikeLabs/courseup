import { get, set } from 'typesaurus';
import { Term } from '../constants';
import { CoursesCollection, TimetablesCollection } from '../db/collections';
import { TimetableCourse, Timetable } from './Timetable.model';
import * as hash from 'object-hash';
import { constructSectionKey } from '../courses/Course.service';

export type TimetableParams = Pick<Timetable, 'courses' | 'term'>;
export type TimetableReturn = { slug: string } & Timetable;

export async function getTimetable(slug: string): Promise<Timetable | null> {
  const result = await get(TimetablesCollection, slug);

  if (!result) return null;
  return {
    term: result.data.term,
    courses: result.data.courses,
  };
}

export async function addTimetable(
  courses: TimetableCourse[],
  term: Term
): Promise<TimetableReturn | null> {
  const slug = hash({ ...courses, term }, { unorderedArrays: true });

  const valid = await hasValidCourses(courses, term);
  if (!valid) return null;

  await set(TimetablesCollection, slug, {
    term,
    courses,
    createdAt: new Date(Date.now()),
    hash: 'test',
  });

  return {
    slug,
    term,
    courses,
  };
}

export async function hasValidCourses(
  courses: TimetableCourse[],
  term: Term
): Promise<boolean> {
  // 12 is the max length of courses we will allow for a timetable in the database
  if (courses.length > 12 || courses.length === 0) return false;

  for (const course of courses) {
    // we currently only support the selection of 1 section, lab and tutorial each
    if (
      (course.lab && course.lab.length > 1) ||
      (course.lecture && course.lecture.length > 1) ||
      (course.tutorial && course.tutorial.length > 1)
    )
      return false;

    // validate course is in database
    const doc = await get(
      CoursesCollection,
      constructSectionKey(term, course.subject, course.code)
    );
    if (!doc || doc.data.pid !== course.pid) return false;
  }

  return true;
}
