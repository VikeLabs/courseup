import { Term } from '../constants';

export type TimetableCourse = {
  /**
   * Abbreviation of the subject of the course.
   * @example "ECE"
   */
  subject: string;
  /**
   * The code portion of the course.
   * @example "260"
   */
  code: string;
  /**
   * The PID of the course.
   * @example "ByS23Pp7E"
   */
  pid: string;
  /**
   * The selected lecture section of the course.
   * @example "A02"
   * @pattern ^A\d{2}$
   */
  lecture?: string[];
  /**
   * The selected lab section of the course.
   * @example "B01"
   * @pattern ^B\d{2}$
   */
  lab?: string[];
  /**
   * The selected tutorial section of the course.
   * @example "T03"
   * @pattern ^T\d{2}$
   */
  tutorial?: string[];
  /**
   * The colour code displayed on the timetable
<<<<<<< HEAD
   * @example "#12345"
=======
   * @example "#123456"
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
   * @pattern ^#(?:[0-9a-fA-F]{3}){1,2}$
   */
  color: string;
};

export type Timetable = {
  term: Term;
  courses: TimetableCourse[];
};
