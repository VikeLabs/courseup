import _ from 'lodash';
import { useCallback } from 'react';

import { COLORS } from '../../app/scheduler/components/SchedulerSidebar';
import { getSections } from '../api/getSections';
import { MeetingTimes, Section } from '../fetchers';
import { getFirstSectionType, hasSectionType } from '../utils/courses';

import useLocalStorage from './storage/useLocalStorage';

export type Course = {
  subject: string;
  code: string;
  pid: string;
  term: string;
  sections: Section[];
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
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);

  const contains = useCallback(
    (pid: string, term: string): boolean => {
      return !!data.find((course) => course.pid === pid && course.term === term);
    },
    [data]
  );

  const sectionIsSaved = useCallback(
    (pid: string, term: string, sectionCode: string): boolean => {
      let check: boolean = false;
      data.forEach((course) => {
        if (course.pid === pid && course.term === term) {
          check =
            course.lab?.sectionCode === sectionCode ||
            course.lecture?.sectionCode === sectionCode ||
            course.tutorial?.sectionCode === sectionCode;
        }
      });

      return check;
    },
    [data]
  );

  const addCourse = useCallback(
    async (newCourse: Course) => {
      // is this course saved already?
      if (!contains(newCourse.pid, newCourse.term)) {
        const { term, subject, code } = newCourse;
        const sections: Section[] = await getSections({ term, subject, code });
        newCourse.sections = sections;

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
      }
    },
    [contains, data, setData]
  );

  const deleteCourse = (oldCourse: Course): void => {
    // find the course, delete if found
    const newArr: Course[] = data.filter((course) => {
      return !_.isEqual(
        _.omit(course, ['lecture', 'lab', 'tutorial', 'color', 'sections']),
        _.omit(oldCourse, ['lecture', 'lab', 'tutorial', 'color', 'sections'])
      );
    });

    setData(newArr);
  };

  const clearCourses = () => {
    setData([]);
  };

  const setSection = (type: string, newSection: SavedSection, existingCourse: Course) => {
    // find the course, add to it if found
    setData([]);
    const newArr: Course[] = data.map((course) => {
      if (
        _.isEqual(
          _.omit(course, ['lecture', 'lab', 'tutorial', 'color', 'sections']),
          _.omit(existingCourse, ['lecture', 'lab', 'tutorial', 'color', 'sections'])
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

  return { courses: data, addCourse, deleteCourse, clearCourses, setSection, contains, sectionIsSaved };
};
