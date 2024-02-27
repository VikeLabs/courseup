import { getSubjects } from '@lib/subjects';
import TermSelectBox from './components/TermSelectBox';
import ResizeablePanelContainer from './components/ResizeablePanelContainer';

export default async function TermLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { term: string };
}>) {
  const subjects = await getSubjects(params.term);
  return (
    <main>
      <ResizeablePanelContainer
        mainPanelContent={
          <div className="flex-col">
            <TermSelectBox params={params} />
            <ul>
              {subjects.map((subject) => (
                <li key={subject.subject} className="py-2">
                  <a href={`/explore/${params.term}/${subject.subject}`} className="hover:text-blue-600">
                    <span className="font-bold">{subject.subject}</span>: {subject.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
        mainPanelMinSize={12}
        mainPanelDefaultSize={12}
      >
        {children}
      </ResizeablePanelContainer>
    </main>
  );
}
