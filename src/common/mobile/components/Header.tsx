import { Center, Grid, GridItem, Flex, Text, LinkBox, Box, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { NavButtons } from 'common/header/components/NavButtons';
import { RightSideButtons } from 'common/header/components/RightSideButtons';
import { Search } from 'common/header/components/SearchBar';
import { TermButtons } from 'common/header/components/TermButtons';
import { Banner } from 'common/header/components/Banner';

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

/**
 * Primary UI component for content
 */
export function HeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  return (
    <Box zIndex="overlay" position="sticky" top={0}>
      <Banner />
      <Grid templateColumns="repeat(3, 1fr)" as="header" py="1.5" px="8" boxShadow="md" zIndex={100} maxH="56px">
        <GridItem colSpan={1}>
          <Flex justifyContent="space-between" alignContent="center" alignItems="flex-start">
            <LinkBox as={RouterLink} to="/" bg="transparent" border="none" ml={5} _hover={{ textDecor: 'none' }}>
              <Text fontSize="xl" fontWeight="bold">
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
          <HStack justifyContent="space-between">
            <TermButtons />
            <RightSideButtons />
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
