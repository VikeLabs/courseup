import { Button, Center, Flex, Grid, GridItem, HStack, IconButton, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import useWindowDimensions from '../../shared/hooks/useWindowDimensions';

import { Search } from './components/SearchBar';
import { TermButtons } from './components/TermButtons';

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

function HeaderMobile(): JSX.Element {
  return (
    <HStack as="header" py="3" px="8" boxShadow="md" bg="white" zIndex={100}>
      <Spacer />
      <Text fontSize="x-large" fontWeight="bold">
        clockwork
      </Text>
      <Spacer />
      <IconButton aria-label="hamburger" icon={<GiHamburgerMenu />} bgColor="rgba(255, 255, 255, 0)" />
    </HStack>
  );
}

/**
 * Primary UI component for content
 */
export function Header({ onSearchChange }: HeaderProps): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 480) setIsMobile(true);
    else setIsMobile(false);
  }, [width]);
  if (isMobile) return <HeaderMobile />;

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
