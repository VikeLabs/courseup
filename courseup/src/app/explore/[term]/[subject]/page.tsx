import { getCoursesBySubject } from '@lib/courses';
import { getReadableTerm } from '@lib/utils/terms';

export default async function ExploreSubject({ params }: { params: { term: string; subject: string } }) {
  return (
    <div>
      {/* <ul>
        {courses.map((course) => (
          <li key={course.pid}>
            <a href={`/explore/${params.term}/${params.subject}/${course.code}`} className="hover:text-blue-600">
              <span className="font-bold">
                {course.subject}
                {course.code}
              </span>
              : {course.title}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
