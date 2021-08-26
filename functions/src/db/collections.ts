import { CourseTextbooks } from '@vikelabs/uvic-course-scraper/dist';
import { collection, subcollection, Ref } from 'typesaurus';

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

export type CourseTextbookDoc = {
  subject: string;
  code: string;
  term: string;
  sections: Omit<CourseTextbooks, 'subject' | 'code'>[];
};

// highest level collection
const CoursesCollection = collection<CourseDoc>('courses');
const TextbooksCollection = collection<CourseTextbookDoc>('textbooks');

// subcollection of Course
const SectionsSubstore = subcollection<SectionDoc, CourseDoc>(
  'sections',
  CoursesCollection
);

export { CoursesCollection, TextbooksCollection, SectionsSubstore };
