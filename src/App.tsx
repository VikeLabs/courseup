import { Center, ChakraProvider, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { Header, Content, Sidebar } from './app/index';
import { Term } from './fetchers';

export function App(): JSX.Element {
  const [pid, setPid] = useState<string>('');
  const [term, setTerm] = useState<Term>('202101');

  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <Center w="300px" bg="#E4E4E4" minW="10%">
            <Sidebar term="202105" setPid={setPid} pid={pid} />
          </Center>
          <Flex overflowY="auto" width="100%" justifyContent="center">
            {pid.length > 0 && <Content pid={pid} term={term} />}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
