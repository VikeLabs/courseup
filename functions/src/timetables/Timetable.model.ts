import { Term } from '../constants';

export type TimetableCourse = {
  subject: string;
  code: string;
  pid: string;
  lecture?: string;
  lab?: string;
  tutorial?: string;
  color: string;
};

export type Timetable = {
  term: Term;
  courses: TimetableCourse[];
};
