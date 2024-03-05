import { getReadableTerm } from '@lib/utils/terms';
import SelectDropdown from 'components/common/SelectDropdown';

export function TermSelectBox({ params: { term } }: { params: { term: string } }): JSX.Element {
  //TODO: refactor this entire thing into a select box
  return (
    <>
      <SelectDropdown label={`Exploring Term: ${getReadableTerm(term)}`} />
      <h1>
        Exploring term {getReadableTerm(term)}{' '}
        <a href={`/explore`} className="btn btn-sm">
          Change
        </a>
      </h1>
    </>
  );
}
