import { Button, ButtonGroup } from "@chakra-ui/react";

import React, { useCallback, useState } from "react";
import { getButtonTerms, getTerms } from "../shared/utils";

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export function TermButtons({ setTerm }: Props) {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const termNames = getButtonTerms();
  const terms = getTerms();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, name: string) => {
      event.preventDefault();
      setTerm(name);
      if (name === terms[0] && !first) {
        setFirst(true);
        setSecond(false);
        setThird(false);
      } else if (name === terms[1] && !second) {
        setFirst(false);
        setSecond(true);
        setThird(false);
      } else if (name === terms[2] && !third) {
        setFirst(false);
        setSecond(false);
        setThird(true);
      }
    },
    [first, second, setTerm, terms, third]
  );

  return (
    <ButtonGroup spacing="0" isAttached>
      <Button
        name={terms[0]}
        isActive={first}
        onClick={(e) => onClick(e, terms[0])}
        size="sm"
        borderRadius="2px"
      >
        {termNames[0]}
      </Button>
      <Button
        name={terms[1]}
        isActive={second}
        onClick={(e) => onClick(e, terms[1])}
        size="sm"
      >
        {termNames[1]}
      </Button>
      <Button
        name={terms[2]}
        isActive={third}
        onClick={(e) => onClick(e, terms[2])}
        size="sm"
        borderRadius="2px"
      >
        {termNames[2]}
      </Button>
    </ButtonGroup>
  );
}
