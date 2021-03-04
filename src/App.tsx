import { Center, ChakraProvider, Flex } from '@chakra-ui/react';
import React from 'react';

import { Header, Content, Sidebar } from './app/index';

export function App(): JSX.Element | null {
  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <Sidebar term="202105" />
          <Center flex="1" bg="tomato" minW="80%">
            <Content />
          </Center>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
