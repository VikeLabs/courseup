import { useEffect, useState, useCallback } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Center,
  Grid,
  GridItem,
  Flex,
  Text,
  LinkBox,
  Box,
  Collapse,
  Alert,
  CloseButton,
  AlertDescription,
  IconButton,
} from '@chakra-ui/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';

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
  const [banner, setBanner] = useSessionStorage('user:banner', true);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    '💡 Your courses and sections are saved between sessions, no need to leave the tab open!',
    "💡 Press the 'Register' button while viewing your timetable to help you quickly register for classes!",
    "💡 See something you don't like or think might be a bug? Send feedback to the team via the button at the bottom right!",
    '💡 Courses that appear transparent on your timetable mean that section happens during that time, but not during the week you are viewing.',
    "⚠️ We're in beta right now so expect things to be a bit rocky. ⚠️",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTipIndex((tipIndex + 1) % tips.length);
    }, 2 * 60 * 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [tipIndex, tips.length]);

  const back = useCallback(() => {
    tipIndex - 1 < 0 ? setTipIndex(tips.length - 1) : setTipIndex(tipIndex - 1);
  }, [tipIndex, tips.length]);

  const forward = useCallback(() => {
    setTipIndex((tipIndex + 1) % tips.length);
  }, [tipIndex, tips.length]);

  return (
    <Box zIndex={1000}>
      <Collapse in={banner} animateOpacity>
        <Alert status="success" alignItems="center" justifyContent="center" variant="solid">
          <IconButton
            aria-label="idk yet ill change this"
            icon={<ChevronLeftIcon />}
            bgColor="transparent"
            _hover={{
              bgColor: 'transparent',
              color: '#707070',
            }}
            size="lg"
            h="fit-content"
            mx={2}
            onClick={back}
          />
          <Center w="1100px">
            <AlertDescription>{`${tips[tipIndex]}`}</AlertDescription>
          </Center>
          <IconButton
            aria-label="idk yet ill change this"
            icon={<ChevronRightIcon />}
            bgColor="transparent"
            size="lg"
            h="fit-content"
            _hover={{
              bgColor: 'transparent',
              color: '#707070',
            }}
            mx={2}
            onClick={forward}
          />
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setBanner(false)} />
        </Alert>
      </Collapse>
      <Grid
        templateColumns="repeat(3, 1fr)"
        as="header"
        py="1.5"
        px="8"
        boxShadow="md"
        bg="#82cbee"
        zIndex={100}
        maxH="56px"
        onClick={() => setTipIndex((tipIndex + 1) % tips.length)}
      >
        <GridItem colSpan={1}>
          <Flex justifyContent="space-between" alignContent="center" alignItems="flex-start">
            <LinkBox as={Link} to="/" bg="transparent" border="none" ml={5}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
                _focusVisible={{ textShadow: '2px 2px 5px black', outline: 'none' }}
                tabIndex={0}
              >
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
      </Grid>
    </Box>
  );
}
