import { Box, Center, ChakraProvider, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { TermContext } from './app/context/TermContext';
import { Header, Content, Sidebar } from './app/index';
import { getCurrentTerm } from './app/shared/utils/terms';
import { Term } from './fetchers';

export function App(): JSX.Element | null {
  const [term, setTerm] = useState(getCurrentTerm());
  const [pid, setPid] = useState<string>('');

  return (
    <ChakraProvider>
      <TermContext.Provider value={{ term, setTerm }}>
        <Flex h="100vh" direction="column">
          <Header />
          <Box grow={1} overflow="hidden">
            <Flex color="white" height="100%">
              <Sidebar term="202105" />
              <Center flex="1" bg="white" minW="80%" overflow="auto">
                <Content term={term as Term} pid={pid}/>
              </Center>
            </Flex>
          </Box>
        </Flex>
      </TermContext.Provider>
    </ChakraProvider>
  );
}
