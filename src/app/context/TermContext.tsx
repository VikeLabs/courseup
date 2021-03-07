import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

const TermContext = createContext('');
const UpdateTermContext = createContext<Dispatch<SetStateAction<string>>>(() => undefined);

type Props = {};

export function TermProvider({ children }: React.PropsWithChildren<Props>): JSX.Element {
  const [term, setTerm] = useState('');

  return (
    <TermContext.Provider value={term}>
      <UpdateTermContext.Provider value={setTerm}>{children}</UpdateTermContext.Provider>
    </TermContext.Provider>
  );
}
