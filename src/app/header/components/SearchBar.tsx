import { IconButton, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';

import { useChangeCallback } from '../hooks/useChangeCallback';

export function SearchBar(): JSX.Element {
  const [value, setValue] = useState('');
  const onChange = useChangeCallback(setValue);

  //TODO: add search functionality

  return (
    <InputGroup size="sm">
      <Input
        placeholder="Search a course"
        isFullWidth
        bg="white"
        w="100%"
        minW="100px"
        value={value}
        onChange={onChange}
        data-testid="input"
      />
      <InputRightAddon p="0">
        <IconButton aria-label="Search" borderRadius="0" size="sm" icon={<GrSearch />} />
      </InputRightAddon>
    </InputGroup>
  );
}
