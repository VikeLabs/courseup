export type Course = {
  term: string;
  subject: string;
  code: string;
  pid: string;
  selected: boolean;
  lecture?: string;
  lab?: string;
  tutorial?: string;
  color: string;
};

export type Timetable = {
  slug: string;
  courses: Course[];
};
