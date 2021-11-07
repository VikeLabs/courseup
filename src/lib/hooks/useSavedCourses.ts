import { useCallback } from 'react';

import _ from 'lodash';

import { getSections } from 'lib/api/getSections';
import { MeetingTimes, Term, TimetableCourse } from 'lib/fetchers';
import { SECTION_TYPES, getFirstSectionType, hasSectionType } from 'lib/utils';

import useLocalStorage from './storage/useLocalStorage';

const OMITTED_FIELDS = ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected', 'showSections'];

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

export type SavedCourse = {
  subject: string;
  pid: string;
  code: string;
  term: string;

  /**
   * Whether the course is selected which typically implies displayed or not.
   */
  selected?: boolean;
  showSections?: boolean;

  lecture?: string;
  lab?: string;
  tutorial?: string;

  /**
   * color used for the calendar event and sidebar card
   */
  color?: string;
};

export type SavedSection = {
  meetingTimes: MeetingTimes[];
  sectionCode: string;
};

type SavedCourses = {
  /**
   * An array of courses currently saved
   */
  courses: SavedCourse[];

  // Methods exposed by hook

  addCourse: (term: string, subject: string, code: string, pid: string) => void;
  importCourses: (courses: TimetableCourse[], term: Term) => void;
  replaceCourses: (courses: TimetableCourse[], term: Term) => void;
  deleteCourse: (newCourse: SavedCourse) => void;
  clearCourses: (term: string) => void;
  setSection: (type: string, newSection: SavedSection, existingCourse: SavedCourse) => void;
  contains: (pid: string, term: string) => boolean;
  sectionIsSaved: (pid: string, term: string, sectionCode: string) => boolean;
  setSelected: (selected: boolean, existingCourse: SavedCourse) => void;
  setShowSections: (showSections: boolean, existingCourse: SavedCourse) => void;
};

export const useSavedCourses = (): SavedCourses => {
  // The underlying data persistent storage.
  const [data, setData] = useLocalStorage<SavedCourse[]>('user:saved_courses', []);

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
  const equals = useCallback((a: SavedCourse, b: SavedCourse): boolean => {
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
          (course.pid === pid && course.term === term && course.lab === sectionCode) ||
          course.lecture === sectionCode ||
          course.tutorial === sectionCode
      ),
    [data]
  );

  /**
   * Adds a course to the saved courses.
   */
  const addCourse = useCallback(
    (term: string, subject: string, code: string, pid: string) => {
      // avoid adding a course if it is saved already.
      if (contains(pid, term)) return;

      const course: SavedCourse = { term, subject, code, pid, selected: true, showSections: true };
      // we need to load in the course sections given we have no idea which default sections to select
      getSections({ term, subject, code }).then((sections) => {
        SECTION_TYPES.forEach(({ sectionName, sectionType }) => {
          if (hasSectionType(sections, sectionName)) {
            const index = getFirstSectionType(sections, sectionName);
            course[sectionType] = sections[index].sectionCode;
          }
        });

        // find next unused color. if all are used use a default color
        course.color = COLORS.find((c) => !containsColor(c, term)) ?? '#A0AEC0';

        setData([...data, course]);
      });
      // TODO: add reject
    },
    [contains, containsColor, data, setData]
  );

  /**
   * Adds a list of timetable courses to the saved courses.
   * @param courses: List of timetable courses
   * @param term: Timetable term
   */
  const importCourses = useCallback(
    (courses: TimetableCourse[], term: Term) => {
      // filtered courses keeps only those not currently saved
      const filteredCourses: SavedCourse[] = [];

      courses.forEach(({ subject, code, pid, lecture, lab, tutorial, color }) => {
        // avoid adding a course if it is saved already.
        const containsCourse =
          contains(pid, term) || filteredCourses.some((course) => course.pid === pid && course.term === term);
        if (!containsCourse) {
          // TODO: Clean up?
          // I know this looks bad but I tried some different things and none of them were working but this did :S
          const new_color =
            !containsColor(color, term) &&
            !filteredCourses.some((course) => course.color === color && course.term === term)
              ? color
              : '#A0AEC0';

          const newCourse: SavedCourse = {
            subject,
            pid,
            code,
            term,
            selected: true,
            showSections: true,
            lecture: lecture ? lecture[0] : undefined,
            lab: lab ? lab[0] : undefined,
            tutorial: tutorial ? tutorial[0] : undefined,
            color: new_color,
          };
          filteredCourses.push(newCourse);
        }
      });

      setData([...data].concat(filteredCourses));

      // TODO: add reject
    },
    [contains, containsColor, data, setData]
  );

  /**
   * Replaces saved courses to a list of timetable courses to the saved courses.
   * @param courses: List of timetable courses
   * @param term: Timetable term
   */
  const replaceCourses = useCallback(
    (courses: TimetableCourse[], term: Term) => {
      // filtered courses keeps only those not currently saved
      const filteredCourses: SavedCourse[] = [];

      courses.forEach(({ subject, code, pid, lecture, lab, tutorial, color }) => {
        // avoid adding a course if it is saved already.
        const containsCourse = filteredCourses.some((course) => course.pid === pid && course.term === term);
        if (!containsCourse) {
          // TODO: Clean up?
          // I know this looks bad but I tried some different things and none of them were working but this did :S
          const new_color = !filteredCourses.some((course) => course.color === color && course.term === term)
            ? color
            : '#A0AEC0';

          const newCourse: SavedCourse = {
            subject,
            pid,
            code,
            term,
            selected: true,
            showSections: true,
            lecture: lecture ? lecture[0] : undefined,
            lab: lab ? lab[0] : undefined,
            tutorial: tutorial ? tutorial[0] : undefined,
            color: new_color,
          };
          filteredCourses.push(newCourse);
        }
      });

      setData(filteredCourses);

      // TODO: add reject
    },
    [setData]
  );

  /**
   * Deletes a course from the saved courses if it is found.
   * @param oldCourse
   */
  const deleteCourse = (oldCourse: SavedCourse): void => {
    setData(data.filter((course) => !equals(course, oldCourse)));
  };

  /**
   * Deletes all saved courses.
   */
  const clearCourses = (term: string) => {
    setData(data.filter((course) => course.term !== term));
  };

  const setSection = (type: string, newSection: SavedSection, existingCourse: SavedCourse) => {
    const newArr: SavedCourse[] = data.map((course) => {
      if (equals(course, existingCourse)) {
        if (type === 'lecture' || type === 'lecture topic') {
          course.lecture = newSection.sectionCode;
        } else if (type === 'lab' || type === 'gradable lab') {
          course.lab = newSection.sectionCode;
        } else if (type === 'tutorial') {
          course.tutorial = newSection.sectionCode;
        }
      }
      return course;
    });
    setData(newArr);
  };

  const setSelected = (selected: boolean, existingCourse: SavedCourse) => {
    setData(
      data.map((course) => {
        if (equals(course, existingCourse)) {
          course.selected = selected;
          course.showSections = selected ? true : false;
        }

        return course;
      })
    );
  };

  const setShowSections = (showSections: boolean, existingCourse: SavedCourse) => {
    setData(
      data.map((course) => {
        if (equals(course, existingCourse)) {
          course.showSections = showSections;
        }

        return course;
      })
    );
  };

  return {
    courses: data,
    addCourse,
    importCourses,
    replaceCourses,
    deleteCourse,
    clearCourses,
    setSection,
    contains,
    sectionIsSaved,
    setSelected,
    setShowSections,
  };
};
