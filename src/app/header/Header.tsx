import { Center, Grid, GridItem, Image, Button } from '@chakra-ui/react';

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
      templateColumns={{ base: '1fr', sm: '1fr 1fr', md: '1fr 7fr 3fr' }}
      templateRows={{ base: '1fr 1fr 1fr', sm: '1fr 1fr', md: '1fr' }}
      as="header"
      py="3"
      px="8"
      boxShadow="md"
      bg="#2e95d1"
      zIndex={100}
      alignItems="center"
    >
      <GridItem
        colSpan={{ base: 1, sm: 2, md: 1 }}
        rowStart={{ base: 1, sm: 1, md: 1 }}
        justifySelf="center"
        minW="160px"
        mb={{ sm: '5px', md: '0' }}
      >
        <Button
          as="a"
          href="https://vikelabs.ca/"
          target="_blank"
          bg="transparent"
          border="none"
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _focus={{ border: 'none' }}
          p="0"
        >
          <Image src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="clockwork" h="40px" />
        </Button>
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
