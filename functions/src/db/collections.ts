import { collection, subcollection, Ref } from 'typesaurus';
import { Timetable } from '../timetables/Timetable.model';

export type CourseDoc = {
  // human metadata
  title: string;
  subject: string;
  code: string;
  // indexed / query
  term: string;
  // course metadata
  pid: string;
  crns: string[];
  // if crns.length > 0 then true else false.
  inSession: boolean;

  // datetime metadata
  createdAt: Date;
  updatedAt?: Date;
};

export type SectionDoc = {
  // parent-collection ref
  course: Ref<CourseDoc>;
  //
  crn: string;
  instructors?: string[];
};

// highest level collection
const CoursesCollection = collection<CourseDoc>('courses');

// subcollection of Course
const SectionsSubstore = subcollection<SectionDoc, CourseDoc>(
  'sections',
  CoursesCollection
);

const TimetablesCollection = collection<Timetable>('timetables');

export { CoursesCollection, SectionsSubstore, TimetablesCollection };
