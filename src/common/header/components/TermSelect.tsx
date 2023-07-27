import React from 'react';

import { Select } from '@chakra-ui/react';
import { useMatch, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useTerm } from 'lib/hooks/useTerm';
import { getReadableTerm } from 'lib/utils/terms';

const terms = ['202305', '202309', '202401'];

export function TermSelect(): JSX.Element {
  const { subject } = useParams();
  const [selectedTerm, setTerm] = useTerm();
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

  let colorMap: { [key: string]: string } = {};
  colorMap['09'] = mode('green.500', 'green.300');
  colorMap['01'] = mode('blue.500', 'blue.300');
  colorMap['05'] = mode('yellow.500', 'yellow.300');

  // TODO: A "bug" in Firefox for macOS is preventing the `option` components
  // from inheriting the `Select` background color this leads to illegible text in the options.
  return (
    <Select
      borderColor={colorMap[selectedTerm.slice(-2)]}
      value={selectedTerm}
      onChange={onChange}
      minW="150px"
      borderWidth="2px"
      _hover={{ bgColor: colorMap[selectedTerm.slice(-2)] }}
      _focus={{ borderColor: colorMap[selectedTerm.slice(-2)] }}
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
