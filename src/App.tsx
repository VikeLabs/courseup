import React from 'react';
import { Center, ChakraProvider, Flex, Select } from '@chakra-ui/react';
import { Header, Content, Sidebar } from './app/index';
import { useGetCourses } from './fetchers';

export function App(): JSX.Element {
  const { data } = useGetCourses({ term: '202101' });
  console.log(data);
  const [pid, setPid] = React.useState<string | undefined>();
  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <Center w="300px" bg="#E4E4E4" minW="10%">
             <Sidebar term="202105" setPid={setPid} />
          </Center>
          <Flex overflowY="auto" width="100%" justifyContent="center">
            <Content pid={pid} />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
