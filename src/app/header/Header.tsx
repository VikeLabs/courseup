import { Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useWindowDimensions from '../../shared/hooks/useWindowDimensions';

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
    <Grid templateColumns="repeat(3, 1fr)" as="header" py="3" px="8" boxShadow="md" bg="white" zIndex={100}>
      <GridItem colSpan={1} flexDirection="column">
        <Text fontSize="x-large" fontWeight="bold">
          clockwork
        </Text>
      </GridItem>
      <GridItem colStart={2}>
        <Center>
          <Search onChange={onSearchChange} />
        </Center>
      </GridItem>
      <GridItem colStart={3} alignContent="flex-end">
        <TermButtons />
      </GridItem>
    </Grid>
  );
}
