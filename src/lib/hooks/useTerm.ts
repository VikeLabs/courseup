import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { getCurrentTerm } from 'lib/utils/terms';

import useLocalStorage from './storage/useLocalStorage';

export const useTerm = (): [Term, (term: string) => void] => {
  const { term: termParam } = useParams();
  const defaultTerm = getCurrentTerm();
  const [term, setTerm] = useLocalStorage<string>('user:term', defaultTerm) as [Term, (term: string) => void];

  // The URL parameter should override getCurrentTerm() and the stored term.
  if (termParam) setTerm(termParam);

  return [term, setTerm];
};
