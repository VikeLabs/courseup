import React from 'react';

import { Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getCurrentTerm, getReadableTerm } from 'lib/utils/terms';

const terms = ['202205', '202209', '202301'];

export function TermSelect(): JSX.Element {
  const router = useRouter();
  const { subject } = router.query;
  const [selectedTerm, setTerm] = useSessionStorage('user:term', getCurrentTerm());
  const searchParams = new URLSearchParams(window.location.search);
  const pid = searchParams.get('pid');
  const mode = useDarkMode();

  const calendarMatch = router.pathname.startsWith('/calendar');
  const scheduleMatch = router.pathname.startsWith('/schedule');
  const registrationMatch = router.pathname.startsWith('/registration');
  const booklistMatch = router.pathname.startsWith('/booklist');

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    if (name) {
      setTerm(name);
      if (calendarMatch) {
        router.push(`/calendar/${name}/${subject || ''}${pid ? `?pid=${pid}` : ''}`);
      } else if (scheduleMatch) {
        router.push(`/schedule/${name}`);
      } else if (registrationMatch) {
        router.push(`/registration/${name}`);
      } else if (booklistMatch) {
        router.push(`/booklist/${name}`);
      } else {
        router.push(`/calendar/${name}`);
      }
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
