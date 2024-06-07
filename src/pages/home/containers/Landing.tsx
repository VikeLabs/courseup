import { useEffect, useState } from 'react';

import { Container, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { Search } from 'common/header/components/SearchBar';


export function Landing() {
  const [handIndex, setHandIndex] = useState(0);
  const hands = ['👋', '👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHandIndex((handIndex + 1) % hands.length);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handIndex, hands.length]);

  const mode = useDarkMode();
  return (
    <Flex direction='column' h="100%" w="100%" align='center' justify='center'>
      <Image
        alt="cartoon image of computer"
        src='/assets/computer.svg'
        height={240}
        width={240}
      />
      <VStack>
        <Heading fontSize="4.75em" lineHeight="1.25" mb="1.75rem">
          Explore UVic Courses
        </Heading>
        <Search />
        <Text fontSize="1.6em">CourseUp makes it simple to browse and schedule UVic Courses</Text>
        <Flex
          alignItems="center"
          mt="1rem"
          as="a"
          target="_blank"
          href="https://www.vikelabs.ca"
          direction={{ base: 'column', xl: 'row' }}
        >
          <Text fontSize={{ base: '1em', md: '1.5em' }} color={mode('light.caption', 'dark.caption')}>
            <span>{hands[handIndex]}</span> Built by students @
          </Text>
          <Text fontWeight="bolder" fontSize="1.75em" color={mode('light.brand', 'dark.brand')} ml="1">
            VIKE LABS
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
}
