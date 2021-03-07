import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, HStack, Icon } from '@chakra-ui/react';
import React from 'react';

export interface TopBarProps {
  selectedSubject: string | undefined;
  handleTopBarBackClick(): void;
}

export function TopBar({ selectedSubject, handleTopBarBackClick }: TopBarProps): JSX.Element {
  return (
    <Box
      bg="white"
      p="1em"
      onClick={handleTopBarBackClick}
      top="0"
      m="0"
      borderBottom="0.1em solid black"
      boxShadow="md"
      zIndex="1000"
    >
      <HStack align="center">
        <Box>
          <ChevronLeftIcon color="black" visibility={selectedSubject ? 'visible' : 'hidden'} />
        </Box>
        <Heading color="black" size="sm">
          {selectedSubject || 'Subjects'}
        </Heading>
      </HStack>
    </Box>
  );
}
