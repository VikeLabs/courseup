import { getSubjects } from '@lib/subjects';
import { getReadableTerm } from '@lib/utils/terms';

export default async function ExploreTerm({ params }: { params: { term: string } }) {
  const subjects = await getSubjects(params.term);
  return (
    <div>
      <h1>Explore {getReadableTerm(params.term)}</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.subject}>
            <a href={`/explore/${params.term}/${subject.subject}`} className="hover:text-blue-600">
              <span className="font-bold">{subject.subject}</span>: {subject.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
