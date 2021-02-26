import { YellowButton } from "../shared/styles";

import React, { useCallback, useState } from "react";
import { getButtonTerms, getTerms } from "../shared/utils";

type ButtonType =
  | "primary"
  | "default"
  | "link"
  | "text"
  | "ghost"
  | "dashed"
  | undefined;

const setType = (button: boolean): ButtonType => {
  let toRet: ButtonType;
  button ? (toRet = "primary") : (toRet = "default");
  return toRet;
};

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export function TermButtons({ setTerm }: Props) {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const firstType = setType(first);
  const secondType = setType(second);
  const thirdType = setType(third);

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
    <div>
      <YellowButton
        name={terms[0]}
        type={firstType}
        onClick={(e) => onClick(e, terms[0])}
      >
        {termNames[0]}
      </YellowButton>
      <YellowButton
        name={terms[1]}
        type={secondType}
        onClick={(e) => onClick(e, terms[1])}
      >
        {termNames[1]}
      </YellowButton>
      <YellowButton
        name={terms[2]}
        type={thirdType}
        onClick={(e) => onClick(e, terms[2])}
      >
        {termNames[2]}
      </YellowButton>
    </div>
  );
}
