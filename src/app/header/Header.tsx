import { Center, Grid, GridItem, Image, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { NavButtons } from './components/NavButtons';
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
      templateColumns="repeat(3, 1fr)"
      as="header"
      py="3"
      px="8"
      boxShadow="md"
      bg="#2e95d1"
      zIndex={100}
      maxH="56px"
    >
      <GridItem colSpan={1}>
        <Flex justifyContent="space-between">
          <Button
            as={Link}
            to="/"
            bg="transparent"
            border="none"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            _focus={{ border: 'none' }}
            ml={5}
          >
            <Image src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="clockwork" h="40px" />
          </Button>
          <NavButtons />
        </Flex>
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
