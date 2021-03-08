import { createContext, Dispatch, SetStateAction } from 'react';

export const TermContext = createContext<{ term: string; setTerm: Dispatch<SetStateAction<string>> }>({
  term: '',
  setTerm: () => undefined,
});
