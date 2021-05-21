import _ from 'lodash';
import { useCallback } from 'react';

import { COLORS } from '../../app/scheduler/components/SchedulerSidebar';
import { getSections } from '../api/getSections';
import { MeetingTimes, Section } from '../fetchers';
import { getFirstSectionType, hasSectionType } from '../utils/courses';

import useLocalStorage from './storage/useLocalStorage';

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
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (newCourse: Course) => void;
  clearCourses: () => void;
  setSection: (type: string, newSection: SavedSection, existingCourse: Course) => void;
  contains: (pid: string, term: string) => boolean;
  sectionIsSaved: (pid: string, term: string, sectionCode: string) => boolean;
  setSelected: (selected: boolean, existingCourse: Course) => void;
};

export const useSavedCourses = (): SavedCourses => {
  // The underlying data persistent storage.
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);

  /**
   * Checks whether a course is saved
   */
  const contains = useCallback(
    (pid: string, term: string): boolean => {
      return !!data.find((course) => course.pid === pid && course.term === term);
    },
    [data]
  );

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
    async (newCourse: Course) => {
      // avoid adding a course if it is saved already.
      if (contains(newCourse.pid, newCourse.term)) return;

      const { term, subject, code } = newCourse;
      const sections: Section[] = await getSections({ term, subject, code });
      newCourse.sections = sections;
      newCourse.selected = true;

      if (hasSectionType(newCourse.sections, 'lecture')) {
        const index = getFirstSectionType(newCourse.sections, 'lecture');
        newCourse.lecture = newCourse.sections[index];
      }
      if (hasSectionType(newCourse.sections, 'lab')) {
        const index = getFirstSectionType(newCourse.sections, 'lab');
        newCourse.lab = newCourse.sections[index];
      }
      if (hasSectionType(newCourse.sections, 'tutorial')) {
        const index = getFirstSectionType(newCourse.sections, 'tutorial');
        newCourse.tutorial = newCourse.sections[index];
      }

      newCourse.color = COLORS[data.length];
      setData([...data, newCourse]);
    },
    [contains, data, setData]
  );

  const deleteCourse = (oldCourse: Course): void => {
    // find the course, delete if found
    const newArr: Course[] = data.filter((course) => {
      return !_.isEqual(
        _.omit(course, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected']),
        _.omit(oldCourse, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected'])
      );
    });

    setData(newArr);
  };

  const clearCourses = () => {
    setData([]);
  };

  const setSection = (type: string, newSection: SavedSection, existingCourse: Course) => {
    const newArr: Course[] = data.map((course) => {
      if (
        _.isEqual(
          _.omit(course, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected']),
          _.omit(existingCourse, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected'])
        )
      ) {
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
        if (
          _.isEqual(
            _.omit(course, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected']),
            _.omit(existingCourse, ['lecture', 'lab', 'tutorial', 'color', 'sections', 'selected'])
          )
        ) {
          course.selected = selected;
        }

        return course;
      })
    );
  };

  return { courses: data, addCourse, deleteCourse, clearCourses, setSection, contains, sectionIsSaved, setSelected };
};
