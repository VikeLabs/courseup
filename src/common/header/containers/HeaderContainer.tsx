import { useContext } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Center,
  Grid,
  GridItem,
  Flex,
  Text,
  LinkBox,
  Box,
  HStack,
  IconButton,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { SidebarContext } from 'lib/context/sidebarContext';

import { Banner } from '../components/Banner';
import { NavButtons } from '../components/NavButtons';
// import { RightSideButtons } from '../components/RightSideButtons';
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
  const [isMobile] = useMediaQuery('(max-width: 1030px)');

  const { setIsOpen, isOpen } = useContext(SidebarContext);

  return (
    <Box zIndex={isOpen ? 'none' : 'overlay'} position="sticky" top={0}>
      <Banner />
      <VStack as="header" py="1.5" px="8" boxShadow="md" zIndex={100} maxH="56px">
        <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(2, 1fr)">
          <GridItem colSpan={1}>
            <Flex justifyContent="space-between" alignContent="center" alignItems="flex-start">
              {!isMobile ? (
                <LinkBox as={RouterLink} to="/" bg="transparent" border="none" ml={5} _hover={{ textDecor: 'none' }}>
                  <Text fontSize="xl" fontWeight="bold">
                    CourseUp
                  </Text>
                </LinkBox>
              ) : (
                <IconButton
                  size="sm"
                  icon={<HamburgerIcon />}
                  aria-label="browse courses"
                  mr="1"
                  onClick={() => setIsOpen(true)}
                />
              )}
              <NavButtons />
            </Flex>
          </GridItem>
          <GridItem colStart={2}>
            <Center>{!isMobile && <Search onChange={onSearchChange} />}</Center>
          </GridItem>
          <GridItem colStart={3}>
            <HStack justifyContent="space-between">
              <TermButtons />
              {/* <RightSideButtons /> */}
            </HStack>
          </GridItem>
        </Grid>
        {/* <Box h="fit-content">
          <Collapse in={banner}>
            <Center>
              <Search onChange={onSearchChange} />
            </Center>
          </Collapse>
        </Box> */}
      </VStack>
    </Box>
  );
}
