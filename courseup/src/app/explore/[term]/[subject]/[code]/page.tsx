import { getCourseBySubjectCode } from '@lib/courses';
import CourseDisplay from './components/CourseDisplay';

export default async function ExploreCourse({ params }: { params: { term: string; subject: string; code: string } }) {
  const courseDetails = await getCourseBySubjectCode(params.term, params.subject, params.code);
  return <CourseDisplay courseDetails={courseDetails} />;
}
