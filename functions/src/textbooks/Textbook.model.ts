import { ExtendedTextbook } from '../db/collections';

export type CourseTextbook = {
  section?: string;
  additionalInfo?: string[];
  instructor?: string;
  textbooks: ExtendedTextbook[];
};
