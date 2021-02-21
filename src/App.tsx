import React from "react";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";
import { Header, Content, Sidebar } from "./app/index";

export function App(): JSX.Element | null {
  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header />
        <Flex color="white" h="100%" grow={1}>
          <Center w="300px" bg="#E4E4E4" minW="10%">
            <Sidebar />
          </Center>
          <Center flex="1" bg="tomato" minW="80%">
            <Content />
          </Center>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
