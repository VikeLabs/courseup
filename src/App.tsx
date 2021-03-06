import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import React from 'react';

import { TermProvider } from './app/context/TermContext';
import { Header, Content, Sidebar } from './app/index';

export function App(): JSX.Element | null {
  return (
    <ChakraProvider>
      <TermProvider>
        <Flex h="100vh" direction="column">
          <Header />
          <Box grow={1} overflow="hidden">
            <Flex color="white" height="100%">
              <Sidebar term="202105" />
              <Center flex="1" bg="white" minW="80%" overflow="auto">
                <Content />
              </Center>
            </Flex>
          </Box>
        </Flex>
      </TermProvider>
    </ChakraProvider>
  );
}
