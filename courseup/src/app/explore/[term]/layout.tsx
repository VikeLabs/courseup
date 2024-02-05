import { getSubjects } from '@lib/subjects';
import { getReadableTerm } from '@lib/utils/terms';

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
      <h1>
        Exploring term {getReadableTerm(params.term)}{' '}
        <a href={`/explore`} className="btn btn-sm">
          Change
        </a>
      </h1>
      <div className="flex gap-2">
        <ul className="w-1/4 min-w-40">
          {subjects.map((subject) => (
            <li key={subject.subject} className="py-2">
              <a href={`/explore/${params.term}/${subject.subject}`} className="hover:text-blue-600">
                <span className="font-bold">{subject.subject}</span>: {subject.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-full py-2">{children}</div>
      </div>
    </main>
  );
}
