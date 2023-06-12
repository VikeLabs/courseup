import { useEffect, useMemo } from 'react';

import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { getCurrentTerm } from 'lib/utils/terms';

import useLocalStorage from './storage/useLocalStorage';

export const useTerm = (): [Term, (term: string) => void] => {
  const { term: termParam } = useParams();
  // The URL parameter should override getCurrentTerm() and the stored term.
  const defaultTerm = useMemo(() => termParam || getCurrentTerm(), [termParam]);
  const [term, setTerm] = useLocalStorage<string>('user:term', defaultTerm) as [Term, (term: string) => void];

  useEffect(() => {
    if (termParam && termParam !== term) {
      setTerm(termParam);
    }
  }, [termParam, term, setTerm]);

  return [term, setTerm];
};
