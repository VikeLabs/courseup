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
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Banner } from '../components/Banner';
import { NavButtons } from '../components/NavButtons';
import { RightSideButtons } from '../components/RightSideButtons';
import { Search } from '../components/SearchBar';
import { TermSelect } from '../components/TermSelect';

export function MobileHeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      zIndex="overlay"
      position="sticky"
      top={0}
      as="header"
      px={{ lg: 8, md: 5, base: 3 }}
      boxShadow="md"
      pb="1"
      data-testid="mobile-header"
    >
      <HStack justifyContent="space-between" minH="56px">
        <LinkBox as={Link} to="/" tabIndex={0} w="fit-content" mr="2">
          <Image
            src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Wordmark.svg'}
            maxH="55px"
            minW="7em"
            alt="CourseUp"
            color="transparent"
            loading="lazy"
            mr="2"
          />
        </LinkBox>
        <Search onChange={onSearchChange} />
        <IconButton aria-label="menu" onClick={onToggle} icon={<HamburgerIcon />} variant="ghost" fontSize="1.5em" />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack width="100%" mb="1.5">
          <TermSelect />
          <NavButtons />
          <RightSideButtons />
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
        <Box zIndex="overlay" position="sticky" top={0} data-testid="desktop-header">
          <HStack as="header" px="8" boxShadow="md" zIndex={100} minH="56px">
            <LinkBox as={Link} to="/" tabIndex={0} w="fit-content">
              <Image
                src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Wordmark.svg'}
                maxH="55px"
                minW="7em"
                alt="CourseUp"
                color="transparent"
                loading="lazy"
                mr="2"
              />
              {/* <Text fontSize="xl" fontWeight="bold" mr="2">
                CourseUp
              </Text> */}
            </LinkBox>
            <Search onChange={onSearchChange} />
            <NavButtons />
            <Spacer />
            <HStack marginLeft="auto">
              <TermSelect />
              <RightSideButtons />
            </HStack>
          </HStack>
        </Box>
      )}
    </>
  );
}
