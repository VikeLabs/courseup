import _ from 'lodash';
import { useCallback } from 'react';

import { getSections } from '../api/getSections';
import { MeetingTimes, Section, SectionType } from '../fetchers';
import { getFirstSectionType, hasSectionType } from '../utils/courses';

import useLocalStorage from './storage/useLocalStorage';

const OMITTED_FIELDS = ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected'];

export const COLORS = [
  '#F56565', // red
  '#48BB78', // green
  '#4299E1', // blue
  '#ED8936', // orange
  '#38B2AC', // teal
  '#9F7AEA', // purple
  '#ECC94B', // yellow
  '#0BC5EA', // cyan
  '#ED64A6', // pink
];

const SECTION_TYPES: {
  sectionName: SectionType;
  sectionType: 'lecture' | 'lab' | 'tutorial';
}[] = [
  { sectionName: 'lecture', sectionType: 'lecture' },
  { sectionName: 'lecture topic', sectionType: 'lecture' },
  { sectionName: 'lab', sectionType: 'lab' },
  { sectionName: 'gradable lab', sectionType: 'lab' },
  { sectionName: 'tutorial', sectionType: 'tutorial' },
];

export type Course = {
  subject: string;
  pid: string;
  code: string;
  term: string;
  sections: Section[];
  selected?: boolean;
  color?: string;
  textColor?: string;
  lecture?: SavedSection;
  lab?: SavedSection;
  tutorial?: SavedSection;
};

export type SavedSection = {
  meetingTimes: MeetingTimes[];
  sectionCode: string;
};

type SavedCourses = {
  /**
   * An array of courses currently saved
   */
  courses: Course[];

  // Methods exposed by hook

  addCourse: (newCourse: Course) => void;
  deleteCourse: (newCourse: Course) => void;
  clearCourses: () => void;
  setSection: (type: string, newSection: SavedSection, existingCourse: Course) => void;
  contains: (pid: string, term: string) => boolean;
  sectionIsSaved: (pid: string, term: string, sectionCode: string) => boolean;
  setSelected: (selected: boolean, existingCourse: Course) => void;
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);
  // const [usedColors, setUsedColors] = useState<string[]>([]);

  // The underlying data persistent storage.

  const containsColor = useCallback(
    (color: string, term: string): boolean => data.some((course) => course.color === color && course.term === term),
    [data]
  );

  /**
   * Checks whether a course is saved
   */
  const contains = useCallback(
    (pid: string, term: string): boolean => {
      return data.some((course) => course.pid === pid && course.term === term);
    },
    [data]
  );

  /**
   * Checks the equality of two courses
   * @param a Course
   * @param b Course
   * @returns
   */
  const equals = useCallback((a: Course, b: Course): boolean => {
    // TODO: remove use of lodash omit
    return _.isEqual(_.omit(a, OMITTED_FIELDS), _.omit(b, OMITTED_FIELDS));
  }, []);

  /**
   * Checks whether section for a course is saved.
   */
  const sectionIsSaved = useCallback(
    (pid: string, term: string, sectionCode: string) =>
      data.some(
        (course) =>
          (course.pid === pid && course.term === term && course.lab?.sectionCode === sectionCode) ||
          course.lecture?.sectionCode === sectionCode ||
          course.tutorial?.sectionCode === sectionCode
      ),
    [data]
  );

  /**
   * Adds a course to the saved courses.
   */
  const addCourse = useCallback(
    (newCourse: Course) => {
      // avoid adding a course if it is saved already.
      if (contains(newCourse.pid, newCourse.term)) return;

      const { term, subject, code } = newCourse;

      // load section data in for the course
      getSections({ term, subject, code }).then((sections) => {
        newCourse.sections = sections;
        newCourse.selected = true;

        // sets the default section to the first one for each section type
        SECTION_TYPES.forEach(({ sectionName, sectionType }) => {
          if (hasSectionType(newCourse.sections, sectionName)) {
            const index = getFirstSectionType(newCourse.sections, sectionName);
            newCourse[sectionType] = newCourse.sections[index];
          }
        });
        // assign a colour to the course
        for (const color of COLORS) {
          if (!containsColor(color, newCourse.term)) {
            newCourse.color = color;
            break;
          }
        }
        // if no colors left, use grey
        if (!newCourse.color) {
          newCourse.color = '#A0AEC0';
        }

        // TODO: minimize saved data
        setData([...data, newCourse]);
      });
    },
    [contains, containsColor, data, setData]
  );

  /**
   * Deletes a course from the saved courses if it is found.
   * @param oldCourse
   */
  const deleteCourse = (oldCourse: Course): void => {
    setData(data.filter((course) => !equals(course, oldCourse)));
  };

  /**
   * Deletes all saved courses.
   */
  const clearCourses = () => {
    setData([]);
  };

  const setSection = (type: string, newSection: SavedSection, existingCourse: Course) => {
    const newArr: Course[] = data.map((course) => {
      if (equals(course, existingCourse)) {
        if (type === 'lecture') {
          course.lecture = newSection;
        } else if (type === 'lab') {
          course.lab = newSection;
        } else if (type === 'tutorial') {
          course.tutorial = newSection;
        }
      }
      return course;
    });
    setData(newArr);
  };

  const setSelected = (selected: boolean, existingCourse: Course) => {
    setData(
      data.map((course) => {
        if (equals(course, existingCourse)) {
          course.selected = selected;
        }

        return course;
      })
    );
  };

  return {
    courses: data,
    addCourse,
    deleteCourse,
    clearCourses,
    setSection,
    contains,
    sectionIsSaved,
    setSelected,
  };
};
