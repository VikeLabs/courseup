import { Center, Grid, GridItem, Flex, Text, LinkBox, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { Banner } from '../components/Banner';
import { NavButtons } from '../components/NavButtons';
import { Search } from '../components/SearchBar';
import { TermButtons } from '../components/TermButtons';

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

/**
 * Primary UI component for content
 */
export function HeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  return (
    <Box zIndex={1000}>
      <Banner />
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
            <LinkBox as={RouterLink} to="/" bg="transparent" border="none" ml={5} _hover={{ textDecor: 'none' }}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                CourseUp!
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
    </Box>
  );
}
