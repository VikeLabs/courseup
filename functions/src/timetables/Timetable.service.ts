import { get, set } from 'typesaurus';
import { Term } from '../constants';
import { TimetablesCollection } from '../db/collections';
import { TimetableCourse, Timetable } from './Timetable.model';

export type TimetableParams = Pick<Timetable, 'courses' | 'term'>;

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
): Promise<Timetable> {
  //todo: hash courses to use as key
  const slug = `${courses.length}${term}`;

  await set(TimetablesCollection, slug, {
    term,
    courses,
    createdAt: new Date(Date.now()),
  });

  return {
    // slug,
    term,
    courses,
  };
}
