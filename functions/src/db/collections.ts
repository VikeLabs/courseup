import { collection, subcollection, Ref } from 'typesaurus';
import { Term } from '../constants';
import { TimetableCourse } from '../timetables/Timetable.model';

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

export type TimetableDoc = {
  term: Term;
  courses: TimetableCourse[];
  hash: string;
  slug: string;
  createdAt: Date;
  updatedAt?: Date;
};

// highest level collection
const CoursesCollection = collection<CourseDoc>('courses');

// subcollection of Course
const SectionsSubstore = subcollection<SectionDoc, CourseDoc>(
  'sections',
  CoursesCollection
);

const TimetablesCollection = collection<TimetableDoc>('timetables');

export { CoursesCollection, SectionsSubstore, TimetablesCollection };
