import { Box, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

import { SearchBar } from './components/SearchBar';
import { TermButtons } from './components/TermButtons';
import { UserButton } from './components/UserButton';

export interface HeaderProps {
  /**
   * setTerm: changes the state of the term selected with the buttons
   */
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Primary UI component for content
 */
export const Header: React.FC<HeaderProps> = ({ setTerm }) => {
  return (
    <Box bg="tomato" h={66} px="10" py="4">
      <Flex minW="900px">
        {/* TODO: turn this into a logo */}
        <Box w={225} textAlign="center">
          <Text fontSize="x-large" color="white" fontWeight="bold">
            clockwork
          </Text>
        </Box>
        <Spacer />
        <HStack spacing="10px" w="60%">
          <SearchBar />
          <TermButtons setTerm={setTerm} />
        </HStack>
        <Spacer />
        <UserButton />
      </Flex>
    </Box>
  );
};
