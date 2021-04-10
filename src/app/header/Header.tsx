import { Center, Grid, GridItem, Text } from '@chakra-ui/react';

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
    <Grid
      templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 5fr 1fr' }}
      templateRows={{ base: '1fr 1fr 1fr', sm: '1fr 1fr', md: '1fr' }}
      as="header"
      py="3"
      px="8"
      boxShadow="md"
      bg="white"
      zIndex={100}
      mt={{ base: -3, md: 0 }}
      justifyItems="center"
      alignItems="center"
    >
      <GridItem colSpan={{ base: 1, sm: 2, md: 1 }} rowStart={{ base: 1, sm: 1, md: 1 }}>
        <Text fontSize="x-large" fontWeight="bold">
          clockwork
        </Text>
      </GridItem>
      <GridItem
        colStart={{ base: 1, sm: 1, md: 2 }}
        colSpan={{ base: 1, sm: 1, md: 1 }}
        rowStart={{ base: 3, sm: 2, md: 1 }}
      >
        <Center>
          <Search onChange={onSearchChange} />
        </Center>
      </GridItem>
      <GridItem colStart={{ base: 1, sm: 2, md: 3 }} rowStart={{ base: 2, sm: 2, md: 1 }} alignContent="flex-end">
        <TermButtons />
      </GridItem>
    </Grid>
  );
}
