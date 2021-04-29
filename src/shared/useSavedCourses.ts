import useLocalStorage from './useLocalStorage';

const useSavedCourses = (key: string, initialData: string) => {
  const [data, setData, deleteData] = useLocalStorage(key, initialData);
  const addCourse = (courseInfo: string) => {
    setData(courseInfo);
  };
  const deleteCourse = (key: string) => {
    deleteData(key);
  };
  return [data, addCourse, deleteCourse];
};
export default useSavedCourses;
