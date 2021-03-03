import React, { useState } from "react";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";
import { Header, Content, Sidebar } from "./app/index";

import "./App.css";

export function App(): JSX.Element | null {
  //TODO: better way to have term variable set
  const [term, setTerm] = useState("");

  return (
    <ChakraProvider>
      <Flex h="100vh" direction="column">
        <Header setTerm={setTerm} />
        <Flex color="white" h="100%" grow={1}>
          <Sidebar term="202105" />
          <Center flex="1" bg="white" minW="80%">
            <Content />
          </Center>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
