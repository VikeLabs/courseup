import { Box, Center, ChakraProvider, Flex, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';

import { TermContext } from './app/context/TermContext';
import { Header, Content } from './app/index';
import { getCurrentTerm } from './app/shared/utils/terms';
import { SidebarContainer } from './app/sidebar/containers/SidebarContainer';
import { Term } from './fetchers';

export function App(): JSX.Element | null {
  const [term, setTerm] = useState(getCurrentTerm());
  const [pid, setPid] = useState<string | undefined>();

  return (
    <ChakraProvider>
      <TermContext.Provider value={{ term, setTerm }}>
        <Flex h="100vh" direction="column">
          <Header />
          <Box grow={1} overflow="hidden" height="100%">
            <Flex color="white" height="100%">
              <SidebarContainer term={term as Term} pid={pid || ''} setPid={setPid} />
              <Flex bg="white" minW="80%" overflow="auto" justifyContent="center" height="100%">
                {pid ? (
                  <Content term={term as Term} pid={pid} />
                ) : (
                  <Center>
                    <Heading color="black">Select a course from the left.</Heading>
                  </Center>
                )}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </TermContext.Provider>
    </ChakraProvider>
  );
}
