import { Flex } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';

import { Header } from 'common/header';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Center h="100%">
        <Landing />
      </Center>
    </Flex>
  );
}
