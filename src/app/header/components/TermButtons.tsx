import { Button, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import { TermContext } from '../../context/TermContext';
import { getCurrentTerms, getReadableTerm } from '../../shared/utils/terms';

const terms = getCurrentTerms();

export function TermButtons(): JSX.Element {
  const [status, setStatus] = useState([false, false, false]);

  const { term, setTerm } = useContext(TermContext);

  //initally the current term button needs to be set active to reflect the default term of the context
  useEffect(() => {
    const idx = terms.indexOf(term);
    const initStatus = [false, false, false];
    initStatus[idx] = true;
    setStatus(initStatus);
  }, [term]);

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const name = event.currentTarget.getAttribute('name');
    let idx = -1;
    if (name) {
      setTerm(name);
      idx = terms.indexOf(name);
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
