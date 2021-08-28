import { CourseTextbooks } from '../components/TextbookCard';

export type TextbookInfo = {
  subject: string;
  code: string;
  term: string;
  sections: Omit<CourseTextbooks, 'subject' | 'code'>[];
};

export const getCourseTextbooks = async (subject: string, code: string): Promise<TextbookInfo | null> => {
  try {
    const textbooks = await fetch(`/api/textbooks/202109/${subject}/${code}`);
    if (textbooks.status === 404) throw new Error('Textbooks not found');
    return textbooks.json();
  } catch (e) {
    return null;
  }
};
