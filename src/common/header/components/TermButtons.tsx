import React, { useState } from 'react';

import { Select } from '@chakra-ui/react';
import { useMatch, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getCurrentTerm, getReadableTerm } from 'lib/utils';

const terms = ['202105', '202109', '202201'];

export function TermButtons(): JSX.Element {
  const { subject } = useParams();
  const [selectedTerm, setTerm] = useState(getCurrentTerm());
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');
  const mode = useDarkMode();

  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');
  const registrationMatch = useMatch('/registration/*');
  const booklistMatch = useMatch('/booklist/*');

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    if (name) {
      setTerm(name);
      if (calendarMatch) {
        navigate({ pathname: `/calendar/${name}/${subject || ''}`, search: pid ? `?pid=${pid}` : undefined });
      } else if (scheduleMatch) {
        navigate(`/scheduler/${name}`);
      } else if (registrationMatch) {
        navigate(`/registration/${name}`);
      } else if (booklistMatch) {
        navigate(`/booklist/${name}`);
      } else {
        navigate(`/calendar/${name}`);
      }
    }
  };

  // TODO: A "bug" in Chakra is preventing the `option` components from inheriting the `Select` background color
  // this leads to eligible text in the options. https://github.com/chakra-ui/chakra-ui/issues/5331
  return (
    <Select
      borderColor={mode('green.500', 'green.300')}
      defaultValue={selectedTerm}
      value={selectedTerm}
      onChange={onChange}
      minW="150px"
    >
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
