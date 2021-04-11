import { createContext } from 'react';

export const TermContext = createContext<{ term: string }>({
  term: '',
});
