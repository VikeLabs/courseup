import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Center, Grid, GridItem, Flex, Text, LinkBox, Box, useColorMode, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { useDarkMode } from 'lib/hooks/useDarkMode';

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
  const { toggleColorMode } = useColorMode();
  const mode = useDarkMode();

  return (
    <Box zIndex={1000}>
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
          <TermButtons />
        </GridItem>
        <GridItem colStart={4}>
          <IconButton
            aria-label="toggle"
            isRound
            icon={mode(<MoonIcon fontSize="1.3em" />, <SunIcon fontSize="1.3em" />)}
            size="sm"
            onClick={toggleColorMode}
            colorScheme={mode('purple', 'orange')}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
