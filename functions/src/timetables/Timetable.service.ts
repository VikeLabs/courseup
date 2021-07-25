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
  const slug = hash({ ...courses, term }, { unorderedArrays: true });

  const valid = await validTimetable(courses, term);
  if (!valid) return null;

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
  // 12 is the max length of courses we will allow for a timetable in the database
  if (courses.length > 12) return false;

  for (const course of courses) {
    // validate lecture, lab, tutorial follow A01 format
    if (course.lecture) {
      if (!/^A\d{2}$/.test(course.lecture)) return false;
    }
    if (course.lab) {
      if (!/^B\d{2}$/.test(course.lab)) return false;
    }
    if (course.tutorial) {
      if (!/^T\d{2}$/.test(course.tutorial)) return false;
    }

    // validate colour code is hex format
    if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(course.color)) return false;

    // validate course is in database
    const doc = await get(
      CoursesCollection,
      constructSectionKey(term, course.subject, course.code)
    );
    if (!doc || doc.data.pid !== course.pid) return false;
  }

  return true;
}
