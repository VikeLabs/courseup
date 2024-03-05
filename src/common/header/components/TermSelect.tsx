import React from 'react';

import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Term } from 'lib/fetchers';
import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getCurrentTerm, getReadableTerm } from 'lib/utils/terms';

export function TermSelect({
  terms,
  selectedTerm,
  setTerm,
}: {
  terms: Term[];
  selectedTerm: string;
  setTerm: (term: Term) => void;
}): JSX.Element {
  const router = useRouter();
  // const { subject, pid } = router.query;
  // const [selectedTerm, setTerm] = useSessionStorage('user:term', getCurrentTerm());
  const mode = useDarkMode();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    // if name exists and is not the same as the current term and is a valid Term type
    if (name && name !== selectedTerm && terms.includes(name as Term)) {
      setTerm(name as Term);
    }
  };

  // TODO: A "bug" in Firefox for macOS is preventing the `option` components
  // from inheriting the `Select` background color this leads to eligible text in the options.
  return (
    <Select borderColor={mode('green.500', 'green.300')} value={selectedTerm} onChange={onChange} minW="150px">
      {terms.map((term, i) => {
        return (
          <option key={i} value={term}>
            {getReadableTerm(term)}
          </option>
        );
      })}
    </Select>
  );
}
