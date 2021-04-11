import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router';

import { getCurrentTerms, getReadableTerm } from '../../shared/utils/terms';

const terms = getCurrentTerms();

export function TermButtons(): JSX.Element {
  const [status, setStatus] = useState([false, false, false]);

  const { term, subject } = useParams();
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');

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
        navigate(`/calendar/${name}/${subject || ''}`);
      } else if (scheduleMatch) {
        navigate(`/scheduler/${name}`);
      } else {
        navigate(`/calendar/`);
      }
      const status = [false, false, false];
      status[idx] = true;
      setStatus(status);
    }
  };

  return (
    <ButtonGroup spacing="0" isAttached>
      {terms.map((term, i) => {
        return (
          <Button
            colorScheme="whiteAlpha"
            key={i}
            name={term}
            isActive={status[i]}
            onClick={onClick}
            size="sm"
            borderRadius="2px"
            color="black"
          >
            {getReadableTerm(term)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
