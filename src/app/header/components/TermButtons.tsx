import { Button, ButtonGroup } from "@chakra-ui/react";

import React, { useCallback, useMemo } from "react";
import { getButtonTerms, getTerms } from "../shared/utils";

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export function TermButtons({ setTerm }: Props) {
  const status = useMemo(
    () => ({
      first: true,
      second: false,
      third: false,
    }),
    []
  );

  const termNames = getButtonTerms();
  const terms = getTerms();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, name: string) => {
      event.preventDefault();
      setTerm(name);
      if (name === terms[0] && !status.first) {
        status.first = true;
        status.second = false;
        status.third = false;
      } else if (name === terms[1] && !status.second) {
        status.first = false;
        status.second = true;
        status.third = false;
      } else if (name === terms[2] && !status.third) {
        status.first = false;
        status.second = false;
        status.third = true;
      }
    },
    [setTerm, status, terms]
  );

  return (
    <ButtonGroup spacing="0" isAttached>
      <Button
        name={terms[0]}
        isActive={status.first}
        onClick={(e) => onClick(e, terms[0])}
        size="sm"
        borderRadius="2px"
      >
        {termNames[0]}
      </Button>
      <Button
        name={terms[1]}
        isActive={status.second}
        onClick={(e) => onClick(e, terms[1])}
        size="sm"
      >
        {termNames[1]}
      </Button>
      <Button
        name={terms[2]}
        isActive={status.third}
        onClick={(e) => onClick(e, terms[2])}
        size="sm"
        borderRadius="2px"
      >
        {termNames[2]}
      </Button>
    </ButtonGroup>
  );
}
