import { getReadableTerm } from '@lib/utils/terms';

export function TermSelectBox({ params: { term } }: { params: { term: string } }): JSX.Element {
  //TODO: refactor this entire thing into a select box
  return (
    <h1>
      Exploring term {getReadableTerm(term)}{' '}
      <a href={`/explore`} className="btn btn-sm">
        Change
      </a>
    </h1>
  );
}
