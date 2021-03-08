import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

export function UserButton(): JSX.Element {
  return <IconButton aria-label="My Profile" icon={<FaUserAlt />} size="sm" borderRadius="50%" />;
}
