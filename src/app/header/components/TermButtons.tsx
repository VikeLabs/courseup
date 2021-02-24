import { YellowButton } from "../shared/styles";

import React, { useCallback, useState } from "react";

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

export function TermButtons() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  const firstType = setType(first);
  const secondType = setType(second);
  const thirdType = setType(third);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, name: string) => {
      event.preventDefault();
      if (name === "first" && !first) {
        setFirst(true);
        setSecond(false);
        setThird(false);
      } else if (name === "second" && !second) {
        setFirst(false);
        setSecond(true);
        setThird(false);
      } else if (name === "third" && !third) {
        setFirst(false);
        setSecond(false);
        setThird(true);
      }
    },
    [first, second, third]
  );

  return (
    <div>
      <YellowButton
        name="first"
        type={firstType}
        onClick={(e) => onClick(e, "first")}
      >
        Fall 2020
      </YellowButton>
      <YellowButton
        name="second"
        type={secondType}
        onClick={(e) => onClick(e, "second")}
      >
        Spring 2021
      </YellowButton>
      <YellowButton
        name="third"
        type={thirdType}
        onClick={(e) => onClick(e, "third")}
      >
        Summer 2021
      </YellowButton>
    </div>
  );
}
