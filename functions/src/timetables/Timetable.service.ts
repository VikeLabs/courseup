import { get, set } from 'typesaurus';
import { Term } from '../constants';
import { CoursesCollection, TimetablesCollection } from '../db/collections';
import { TimetableCourse, Timetable } from './Timetable.model';
import hash = require('object-hash');
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
  const slug = hash(courses, { unorderedArrays: true });

  if (!validTimetable(courses, term)) return null;

  await set(TimetablesCollection, slug, {
    term,
    courses,
    createdAt: new Date(Date.now()),
  });

  return {
    slug,
    term,
    courses,
  };
}

async function validTimetable(
  courses: TimetableCourse[],
  term: Term
): Promise<boolean> {
  for (const course of courses) {
    course.lab;
    // validate courses are in database
    const doc = get(
      CoursesCollection,
      constructSectionKey(term, course.subject, course.code)
    );
    if (!doc) return false;
  }

  return true;
}
