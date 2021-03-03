import React from "react";

import { FaUserAlt } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

export function UserButton() {
  return (
    <IconButton
      aria-label="My Profile"
      icon={<FaUserAlt />}
      size="sm"
      borderRadius="50%"
    />
  );
}
