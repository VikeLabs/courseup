import { Center, Grid, GridItem, Flex, Text, LinkBox } from '@chakra-ui/react';
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
      py="1.5"
      px="8"
      boxShadow="md"
      bg="#82cbee"
      zIndex={100}
      maxH="56px"
    >
      <GridItem colSpan={1}>
        <Flex justifyContent="space-between" alignContent="center" alignItems="flex-start">
          <LinkBox as={Link} to="/" bg="transparent" border="none" ml={5}>
            <Text fontSize="xl" fontWeight="bold" color="white">
              CourseUp
            </Text>
          </LinkBox>
          <NavButtons />
        </Flex>
      </GridItem>
      <GridItem colStart={2}>
        <Center>
          <Search onChange={onSearchChange} />
        </Center>
      </GridItem>
      <GridItem colStart={3}>
        <TermButtons />
      </GridItem>
    </Grid>
  );
}
