import { getTerms } from '@lib/banner';
import makeFetchCookie from 'fetch-cookie';

export default async function Explore() {
  const fc = makeFetchCookie(fetch);
  const terms = await getTerms(fc, 1, 3);
  return (
    <div>
      <h1>Explore</h1>
      <ul>
        {terms.map((term) => (
          <li key={term.code}>
            <a href={`/explore/${term.code}`} className="hover:text-blue-600">
              <span className="font-bold">{term.code}</span>: {term.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
