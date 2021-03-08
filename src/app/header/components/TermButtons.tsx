import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import { TermContext } from '../../context/TermContext';
import { getCurrentTerms, getReadableTerm } from '../../shared/utils/terms';

export function TermButtons(): JSX.Element {
  const [status, setStatus] = useState([true, false, false]);

  const { setTerm } = useContext(TermContext);

  const terms = getCurrentTerms();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const name = event.currentTarget.getAttribute('name');
    let idx = -1;
    if (name) {
      setTerm(name);
      idx = terms.indexOf(name);
    }
    const status = [false, false, false];
    status[idx] = true;
    setStatus(status);
  };

  return (
    <ButtonGroup spacing="0" isAttached>
      {terms.map((term, i) => {
        return (
          <Button key={i} name={term} isActive={status[i]} onClick={onClick} size="sm" borderRadius="2px">
            {getReadableTerm(term)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
