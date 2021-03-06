import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { useTerm } from '../../context/TermContext';
import { getCurrentTerms, getReadableTerm } from '../../shared/utils/terms';

export function TermButtons(): JSX.Element {
  const [, setTerm] = useTerm();
  const [status, setStatus] = useState([true, false, false]);

  const terms = getCurrentTerms();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, name: string, i: number) => {
      event.preventDefault();
      setTerm(name);
      const status = [false, false, false];
      status[i] = true;
      setStatus(status);
    },
    [setTerm, status, terms]
  );

  return (
    <ButtonGroup spacing="0" isAttached>
      {terms.map((term, i) => {
        return (
          <Button
            key={i}
            name={term}
            isActive={status[i]}
            onClick={(e) => onClick(e, term, i)}
            size="sm"
            borderRadius="2px"
          >
            {getReadableTerm(term)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
