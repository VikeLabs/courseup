import { Input } from "@chakra-ui/react";

import React, { useState } from "react";
import { useChangeCallback } from "../hooks/useChangeCallback";

export function SearchBar() {
  const [value, setValue] = useState("");
  const onChange = useChangeCallback(setValue);

  //TODO: add search functionality

  return (
    <Input
      placeholder="Search a course"
      isFullWidth
      size="sm"
      bg="white"
      w="500px"
      minW="100px"
      value={value}
      onChange={onChange}
    />
  );
}
