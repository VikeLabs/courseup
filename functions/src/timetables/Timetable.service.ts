import cryptoRandomString from 'crypto-random-string';
import { add, query, where } from 'typesaurus';
import { TimetablesCollection } from '../db/collections';
import { Course, Timetable } from './Timetable.model';

export type TimetableParams = Pick<Timetable, 'courses'>;

export async function getTimetable(slug: string): Promise<Timetable> {
  const results = await query(TimetablesCollection, [
    where('slug', '==', slug),
  ]);

  return {
    slug: results[0]?.data.slug ?? '',
    courses: results[0]?.data.courses ?? [],
  };
}

export async function addTimetable(courses: Course[]): Promise<Timetable> {
  const slug = cryptoRandomString({ length: 15, type: 'url-safe' });

  add(TimetablesCollection, { slug, courses });

  return {
    slug,
    courses,
  };
}
