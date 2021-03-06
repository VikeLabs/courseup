import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';

import { Header, Content, Sidebar } from './app/index';

export function App(): JSX.Element | null {
  //TODO: better way to have term variable set
  const [term, setTerm] = useState("");

  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header setTerm={setTerm} />
        <Box grow={1} overflow="hidden">
          <Flex color="white" height="100%">
            <Sidebar term="202105" />
            <Center flex="1" bg="white" minW="80%" overflow="auto">
              <Content pid="12312" term="202101" />
            </Center>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
