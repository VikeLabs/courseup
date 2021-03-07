import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { getCurrentTerm } from '../utils/terms';

const TermContext = createContext(getCurrentTerm());
const UpdateTermContext = createContext<Dispatch<SetStateAction<string>>>(() => undefined);

export const useTerm = (): any => {
  return {
    selectedTerm: useContext(TermContext),
    setTerm: useContext(UpdateTermContext),
  };
};
