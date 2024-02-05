import { getCoursesBySubject } from '@lib/courses';

export default async function SubjectLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { term: string; subject: string };
}>) {
  const courses = await getCoursesBySubject(params.term, params.subject);
  return (
    <main>
      <div className="flex gap-2">
        <ul className="w-1/4 min-w-40">
          {courses.map((course) => (
            <li key={course.pid} className="py-2">
              <a href={`/explore/${params.term}/${params.subject}/${course.code}`} className="hover:text-blue-600">
                <span className="font-bold">
                  {course.subject}
                  {course.code}
                </span>
                : {course.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-full py-2">{children}</div>
      </div>
    </main>
  );
}