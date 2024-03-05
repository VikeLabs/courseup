import { getCoursesBySubject } from '@lib/courses';
import ResizeablePanelContainer from '../components/ResizeablePanelContainer';

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
      <ResizeablePanelContainer
        panelId="exploreSubjectContainer"
        mainPanelContent={
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
        }
        mainPanelMinSize={12}
        mainPanelMaxSize={30}
        mainPanelDefaultSize={20}
      >
        {children}
      </ResizeablePanelContainer>
    </main>
  );
}
