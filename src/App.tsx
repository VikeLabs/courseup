import { useState } from 'react';
import { Center, ChakraProvider, Flex } from '@chakra-ui/react';
import { Header, Content, Sidebar } from './app/index';

export function App(): JSX.Element {
  const [pid, setPid] = useState<string>('');
  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <Center w="300px" bg="#E4E4E4" minW="10%">
            <Sidebar term="202105" setPid={setPid} pid={pid} />
          </Center>
          <Flex overflowY="auto" width="100%" justifyContent="center">
            <Content pid={pid} />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
