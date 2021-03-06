import { Box, Center, Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

import { SearchBar } from './components/SearchBar';
import { TermButtons } from './components/TermButtons';
import { UserButton } from './components/UserButton';

/**
 * Primary UI component for content
 */
export function Header(): JSX.Element {
  return (
    <Box bg="tomato" h="md" px="20" py="4" maxH="66px">
      <Flex minW="900px">
        {/* TODO: turn this into a logo */}
        <Center>
          <Text fontSize="x-large" color="white" fontWeight="bold">
            clockwork
          </Text>
        </Center>
        <Spacer />
        <HStack spacing="10px" w="60%">
          <SearchBar />
          <TermButtons />
        </HStack>
        <Spacer />
        <UserButton />
      </Flex>
    </Box>
  );
}
