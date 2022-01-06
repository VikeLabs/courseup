// import { useMemo } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  LinkBox,
  HStack,
  Spacer,
  useMediaQuery,
  Collapse,
  useDisclosure,
  VStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Banner } from '../components/Banner';
import { NavButtons } from '../components/NavButtons';
import { RightSideButtons } from '../components/RightSideButtons';
import { Search } from '../components/SearchBar';
import { TermButtons } from '../components/TermButtons';

export function MobileHeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box zIndex="overlay" position="sticky" top={0} as="header" px="8" boxShadow="md" pb="1">
      <HStack justifyContent="space-between">
        <IconButton aria-label="menu" onClick={onToggle} icon={<HamburgerIcon />} variant="ghost" fontSize="1.5em" />
        <LinkBox as={Link} to="/" tabIndex={0} w="fit-content">
          {/*
            TODO: LOGO
          <Image
            src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Logo-Blue.svg'}
            maxH="55px"
            minW="4em"
            alt="CourseUp"
            color="transparent"
            loading="lazy"
          /> */}
          <Text fontSize="xl" fontWeight="bold">
            CourseUp
          </Text>
        </LinkBox>
        <RightSideButtons />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack width="100%">
          <TermButtons />
          <Search onChange={onSearchChange} />
          <NavButtons />
        </VStack>
      </Collapse>
    </Box>
  );
}

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

/**
 * Primary UI component for content
 */
export function HeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');

  return (
    <>
      <Banner />
      {isMobile ? (
        <MobileHeaderContainer onSearchChange={onSearchChange} />
      ) : (
        <Box zIndex="overlay" position="sticky" top={0}>
          <HStack as="header" px="8" boxShadow="md" zIndex={100} minH="63px">
            <LinkBox as={Link} to="/" tabIndex={0} w="fit-content">
              {/* <Image
                src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Logo-Blue.svg'}
                maxH="55px"
                minW="4em"
                alt="CourseUp"
                color="transparent"
                loading="lazy"
              /> */}
              <Text fontSize="xl" fontWeight="bold" mr="2">
                CourseUp
              </Text>
            </LinkBox>
            <Search onChange={onSearchChange} />
            <NavButtons />
            <Spacer />
            <HStack marginLeft="auto">
              <TermButtons />
              <RightSideButtons />
            </HStack>
          </HStack>
        </Box>
      )}
    </>
  );
}
