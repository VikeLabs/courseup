import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

const TermContext = createContext('');
const UpdateTermContext = createContext<Dispatch<SetStateAction<string>>>(() => undefined);

export const useTerm = (): [string, Dispatch<SetStateAction<string>>] => {
  return [useContext(TermContext), useContext(UpdateTermContext)];
};

type Props = {};

export function TermProvider({ children }: React.PropsWithChildren<Props>): JSX.Element {
  const [term, setTerm] = useState('');

  return (
    <TermContext.Provider value={term}>
      <UpdateTermContext.Provider value={setTerm}>{children}</UpdateTermContext.Provider>
    </TermContext.Provider>
  );
}
