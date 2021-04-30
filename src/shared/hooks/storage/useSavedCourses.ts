import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';

export type Course = {
  subject: string;
  code: string;
  pid: string;
};

type SavedCourses = {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (pid: string) => void;
  deleteAllCourses: () => void;
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData, deleteData] = useLocalStorage('saved_courses', '');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (data) {
      const courses: Course[] = JSON.parse(data);
      setCourses(courses);
    }
  }, [data]);

  const addCourse = (newCourse: Course) => {
    if (data) {
      const arr: Course[] = JSON.parse(data);
      !arr.find((course) => course.pid === newCourse.pid) && arr.push(newCourse);
      setData(JSON.stringify(arr));
    } else {
      setData(JSON.stringify([newCourse]));
    }
  };

  const deleteCourse = (pid: string) => {
    if (data) {
      const arr: Course[] = JSON.parse(data);
      const newArr = arr.filter((course) => course.pid !== pid);
      setData(JSON.stringify(newArr));
    }
  };

  const deleteAllCourses = () => {
    deleteData('saved_courses');
  };

  return { courses, addCourse, deleteCourse, deleteAllCourses };
};
