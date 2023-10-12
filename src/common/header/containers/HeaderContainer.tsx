import { useEffect, useState } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, LinkBox, HStack, Spacer, Collapse, useDisclosure, VStack, IconButton, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import { Banner } from '../components/Banner';
import { MiscHeaderButtons } from '../components/MiscHeaderButtons';
import { NavButtons } from '../components/NavButtons';
import { Search } from '../components/SearchBar';
import { TermSelect } from '../components/TermSelect';

export function MobileHeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      position="sticky"
      top={0}
      as="header"
      px={{ lg: 8, md: 5, base: 3 }}
      boxShadow="md"
      data-testid="mobile-header"
    >
      <HStack justifyContent="space-between" minH="48px">
        <LinkBox as={Link} href="/" tabIndex={0} w="fit-content" mr="2">
          {/*
          LOGO WILL GO HERE
          <Image
            src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Wordmark.svg'}
            maxH="55px"
            minW="7em"
            alt="CourseUp"
            color="transparent"
            loading="lazy"
            mr="2"
          /> */}
          <Text fontSize="xl" fontWeight="bold" mr="2">
            CourseUp
          </Text>
        </LinkBox>
        <Search onChange={onSearchChange} />
        <IconButton aria-label="menu" onClick={onToggle} icon={<HamburgerIcon />} variant="ghost" fontSize="1.5em" />
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack width="100%" mb="2.5">
          <TermSelect />
          <NavButtons />
          <MiscHeaderButtons />
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
  const smallScreen = useSmallScreen();
  const [tips, setTips] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    setTips(smallScreen
      ? [<Text key="1">⚠️ Mobile is currently in beta.</Text>]
      : [
          <Text key="1">
            📅 The{' '}
            <Text as={Link} href="/calendar/202209" textDecoration="underline">
              Fall 2022
            </Text>{' '}
            and{' '}
            <Text as={Link} href="/calendar/202301" textDecoration="underline">
              Spring 2023
            </Text>{' '}
            calendars are now available. Happy scheduling!
          </Text>,
        ])
  }, [smallScreen])
  
  return (
    <>
      <Banner tips={tips} />
      {smallScreen ? (
        <>
          <MobileHeaderContainer onSearchChange={onSearchChange} />
        </>
      ) : (
        <Box position="sticky" top={0} data-testid="desktop-header">
          <HStack as="header" px="8" boxShadow="md" minH="56px">
            {/*
              LOGO WILL GO HERE
              <Image
                src={process.env.PUBLIC_URL + '/assets/logo/svg/CourseUp-Wordmark.svg'}
                maxH="55px"
                minW="7em"
                alt="CourseUp"
                color="transparent"
                loading="lazy"
                mr="2"
              /> */}
            <Text fontSize="xl" fontWeight="bold" mr="2" w="fit-content">
              <Link href="/" tabIndex={0}>
                CourseUp
              </Link>
            </Text>
            <Search onChange={onSearchChange} />
            <NavButtons />
            <Spacer />
            <HStack>
              <TermSelect />
              <MiscHeaderButtons />
            </HStack>
          </HStack>
        </Box>
      )}
    </>
  );
}
