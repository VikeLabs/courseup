import _ from 'lodash';
import { useCallback } from 'react';

import { MeetingTimes, Term } from '../fetchers';

import useLocalStorage from './storage/useLocalStorage';

export type Course = {
  subject: string;
  code: string;
  pid: string;
  term: string;
  lecture?: Section;
  lab?: Section;
  tutorial?: Section;
  // sections: Section[];
};

type Section = {
  sectionCode: string;
  meetingTimes: MeetingTimes[];
  color?: string;
  textColor?: string;
};

type SavedCourses = {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (newCourse: Course) => void;
  clearCourses: () => void;
  setSection: (type: string, newSection: Section, existingCourse: Course) => void;
  contains: (pid: string, term: string) => boolean;
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);

  const contains = useCallback(
    (pid: string, term: string): boolean => {
      return !!data.find((course) => course.pid === pid && course.term === term);
    },
    [data]
  );

  const addCourse = useCallback(
    async (newCourse: Course) => {
      // is this course saved already?
      if (!contains(newCourse.pid, newCourse.term)) {
        setData([...data, newCourse]);
      }
    },
    [contains, data, setData]
  );

  const deleteCourse = (newCourse: Course): void => {
    // find the course, delete if found
    const newArr: Course[] = data.filter((course) => {
      return !_.isEqual(
        _.omit(course, ['lecture', 'lab', 'tutorial']),
        _.omit(newCourse, ['lecture', 'lab', 'tutorial'])
      );
    });
    setData(newArr);
  };

  const clearCourses = () => {
    setData([]);
  };

  const setSection = (type: string, newSection: Section, existingCourse: Course) => {
    // find the course, add to it if found
    setData([]);
    const newArr: Course[] = data.map((course) => {
      if (
        _.isEqual(
          _.omit(course, ['lecture', 'lab', 'tutorial']),
          _.omit(existingCourse, ['lecture', 'lab', 'tutorial'])
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

  return { courses: data, addCourse, deleteCourse, clearCourses, setSection, contains };
};
