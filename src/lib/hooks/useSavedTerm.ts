import { Term } from 'lib/fetchers';
import { getCurrentTerm } from 'lib/utils/terms';

import useLocalStorage from './storage/useLocalStorage';

export const useSavedTerm = (): [Term, (term: string) => void] => {
  const [term, setTerm] = useLocalStorage<string>('user:term', getCurrentTerm()) as [Term, (term: string) => void];

  return [term, setTerm];
};
