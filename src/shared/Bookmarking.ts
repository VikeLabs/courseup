import useSavedCourses from './useSavedCourses';

const Bookmarking = () => {
  const [courses, addCourse, deleteCourse] = useSavedCourses('courses', '');

  //have a bookmark button which if it is on then we add the course
  //otherwise if the course doesnt already exist we delete it

  // im not sure how to get the data for the course that the user is currently on
};
