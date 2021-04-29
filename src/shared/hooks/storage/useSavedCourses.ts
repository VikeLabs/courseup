import useLocalStorage from './useLocalStorage';

export const useSavedCourses = (key: string): [string, (courseInfo: string) => void, (key: string) => void] => {
  const [data, setData] = useLocalStorage(key, '');

  const addCourse = (pid: string) => {
    if (data) {
      const arr: string[] = JSON.parse(data);
      !arr.includes(pid) && arr.push(pid);
      setData(JSON.stringify(arr));
    } else {
      setData(JSON.stringify([pid]));
    }
  };

  const deleteCourse = (pid: string) => {
    if (data) {
      const arr: string[] = JSON.parse(data);
      const newArr = arr.filter((dataPid) => dataPid !== pid);
      setData(JSON.stringify(newArr));
    }
  };

  return [data, addCourse, deleteCourse];
};
