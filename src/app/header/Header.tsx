import { Center, Flex, HStack, Spacer, Text } from '@chakra-ui/react';

import { SearchBar } from './components/SearchBar';
import { TermButtons } from './components/TermButtons';

/**
 * Primary UI component for content
 */
export function Header(): JSX.Element {
  return (
    <Flex as="header" px="20" py="4" boxShadow="md" bg="white" zIndex={100}>
      {/* TODO: turn this into a logo */}
      <Center>
        <Text fontSize="x-large" fontWeight="bold">
          clockwork
        </Text>
      </Center>
      <Spacer />
      <HStack spacing="10px" w="60%">
        <SearchBar />
        <TermButtons />
      </HStack>
      <Spacer />
    </Flex>
  );
}
