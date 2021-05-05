import _ from 'lodash';

import useLocalStorage from './storage/useLocalStorage';

export type Course = {
  subject: string;
  code: string;
  pid: string;
  term: string;
};

type SavedCourses = {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (newCourse: Course) => void;
  clearCourses: () => void;
  contains: (pid: string, term: string) => boolean;
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);

  const contains = (pid: string, term: string): boolean => {
    return !!data.find((course) => course.pid === pid && course.term === term);
  };

  const addCourse = (newCourse: Course) => {
    // is this course saved already?
    if (!contains(newCourse.pid, newCourse.term)) {
      setData([...data, newCourse]);
    }
  };

  const deleteCourse = (newCourse: Course): void => {
    // find the course, delete if found
    const newArr: Course[] = data.filter((course) => {
      return !_.isEqual(course, newCourse);
    });
    setData(newArr);
  };

  const clearCourses = () => {
    setData([]);
  };

  return { courses: data, addCourse, deleteCourse, clearCourses, contains };
};
