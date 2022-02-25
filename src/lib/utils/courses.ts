import { Section, SectionType, Term } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

export const getFirstSectionType = (sections: Section[], type: SectionType): number => {
  return sections.findIndex((section) => section.sectionType === type);
};

export const hasSectionType = (sections: Section[], type: SectionType): boolean => {
  return sections.some((section) => section.sectionType === type);
};

/**
 * @function groupCoursesByTerm
 * @param {SavedCourse[]} courses
 * @returns {Record<Term, SavedCourse[]>} Object with terms for keys and list of courses as values
 */
export const groupCoursesByTerm = (courses: SavedCourse[]) => {
  return courses.reduce((prev: { [key: string]: SavedCourse[] }, curr: SavedCourse) => {
    let arr: any[] = (prev[curr['term']] = prev[curr['term']] || []);
    arr.push(curr);
    return prev;
  }, {} as Record<Term, SavedCourse[]>);
};
