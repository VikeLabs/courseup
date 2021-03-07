import { ChakraProvider, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { Header, Content } from './app/index';
import { SidebarContainer } from './app/sidebar/containers/SidebarContainer';
import { Term } from './fetchers';

export function App(): JSX.Element {
  const [pid, setPid] = useState<string>('');
  const [term, setTerm] = useState<Term>('202101');

  return (
    <ChakraProvider>
      <Flex h="100vh" overflow="auto" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <SidebarContainer term="202105" setPid={setPid} pid={pid} />
          <Flex overflowY="auto" width="100%" justifyContent="center">
            {pid.length > 0 && <Content pid={pid} term={term} />}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
