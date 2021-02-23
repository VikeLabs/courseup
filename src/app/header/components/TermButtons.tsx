import { Button } from "antd";

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

  return (
    <div>
      <Button name="first" type={firstType}>
        Fall 2020
      </Button>
      <Button name="second" type={secondType}>
        Spring 2021
      </Button>
      <Button name="third" type={thirdType}>
        Summer 2021
      </Button>
    </div>
  );
}
