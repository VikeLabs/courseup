import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { getReadableTerm } from '../../../shared/utils/terms';

const terms = ['202105', '202109', '202201'];

export function TermButtons(): JSX.Element {
  const [status, setStatus] = useState([false, false, false]);

  const { term, subject } = useParams();
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');

  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');
  const registrationMatch = useMatch('/registration/*');

  const navigate = useNavigate();

  // initally the current term button needs to be set active to reflect the default term of the context
  useEffect(() => {
    const idx = terms.indexOf(term);
    const initStatus = [false, false, false];
    initStatus[idx] = true;
    setStatus(initStatus);
  }, [term]);
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    let idx = -1;
    if (name) {
      idx = terms.indexOf(name);
      if (calendarMatch) {
        navigate({ pathname: `/calendar/${name}/${subject || ''}`, search: pid ? `?pid=${pid}` : undefined });
      } else if (scheduleMatch) {
        navigate(`/scheduler/${name}`);
      } else if (registrationMatch) {
        navigate(`/registration/${name}`);
      } else {
        navigate(`/calendar/${name}`);
      }
      const status = [false, false, false];
      status[idx] = true;
      setStatus(status);
    }
  };

  return (
    <ButtonGroup isAttached>
      {terms.map((term, i) => {
        return (
          <Button colorScheme="green" key={i} name={term} isActive={status[i]} onClick={onClick} size="sm">
            {getReadableTerm(term)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
