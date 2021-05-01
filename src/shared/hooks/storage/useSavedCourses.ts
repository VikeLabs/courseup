import useLocalStorage from './useLocalStorage';

export type Course = {
  subject: string;
  code: string;
  pid: string;
  term: string;
};

type SavedCourses = {
  courses: Course[];
  addCourse: (newCourse: Course) => void;
  deleteCourse: (pid: string, term: string) => void;
  clearCourses: () => void;
  contains: (pid: string, term: string) => boolean;
};

export const useSavedCourses = (): SavedCourses => {
  const [data, setData] = useLocalStorage<Course[]>('user:saved_courses', []);

  const contains = (pid: string, term: string): boolean => {
    const result = data.find((course) => course.pid === pid && course.term === term);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  const addCourse = (newCourse: Course) => {
    // is this course saved already?
    if (!contains(newCourse.pid, newCourse.term)) {
      setData([...data, newCourse]);
    }
  };

  const deleteCourse = (pid: string, term: string): void => {
    // find the course, delete if found
    const newArr: Course[] = data.filter((course) => {
      if (course.pid === pid) {
        return course.term !== term;
      }
      return course.pid !== pid;
    });
    setData(newArr);
  };

  const clearCourses = () => {
    setData([]);
  };

  return { courses: data, addCourse, deleteCourse, clearCourses, contains };
};
