import { Flex, Text } from '@chakra-ui/react';

import { Search } from './components/SearchBar';
import { TermButtons } from './components/TermButtons';

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}
/**
 * Primary UI component for content
 */
export function Header({ onSearchChange }: HeaderProps): JSX.Element {
  return (
    <Flex as="header" py="3" px="8" boxShadow="md" bg="white" zIndex={100} justifyContent="space-between">
      <Text fontSize="x-large" fontWeight="bold">
        C
      </Text>
      <Search onChange={onSearchChange} />
      <TermButtons />
    </Flex>
  );
}
