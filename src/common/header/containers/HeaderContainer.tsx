import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Center, Grid, GridItem, Flex, Box, useColorMode, IconButton, Image, LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
            <Center flexGrow={1}>
              <LinkBox as={Link} to="/" tabIndex={0} w="fit-content">
                <Image
                  srcSet={
                    process.env.PUBLIC_URL +
                    '/assets/logo/svg/CourseUp-Logo-With-Wordmark.svg 3000w, ' +
                    process.env.PUBLIC_URL +
                    '/assets/logo/svg/CourseUp-Logo-Blue.svg 2500w'
                  }
                  alt="CourseUp"
                  h="2em"
                  minW="4em"
                />
              </LinkBox>
            </Center>
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
