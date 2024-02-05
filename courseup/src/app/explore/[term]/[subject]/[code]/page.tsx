import { getCourseBySubjectCode } from '@lib/courses';
import { getReadableTerm } from '@lib/utils/terms';

export default async function ExploreCourse({ params }: { params: { term: string; subject: string; code: string } }) {
  const course = await getCourseBySubjectCode(params.term, params.subject, params.code);
  return (
    <div>
      <ul>
        <h1 className="text-2xl font-bold">
          {course.subject}
          {course.code}
        </h1>
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p>{course.description}</p>
        <p>Lecture: {course.hoursCatalog ? course.hoursCatalog[0].lecture : 0}h</p>
        <p>Lab: {course.hoursCatalog ? course.hoursCatalog[0].lab : 0}h</p>
        <p>Tutorial: {course.hoursCatalog ? course.hoursCatalog[0].tutorial : 0}h</p>
        <p>Credits: {typeof course.credits.value === 'string' ? course.credits.value : course.credits.value.min}</p>
      </ul>
    </div>
  );
}