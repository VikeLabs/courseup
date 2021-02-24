import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "./components/SearchBar";
import { UserButton } from "./components/UserButton";

//WIP!!!
//TODO: fix zooming in not messing everything up, icons need to be centred
export function Header() {
  return (
    <Box bg="tomato" h={66} p="4">
      <Flex>
        {/* TODO: turn this into a logo */}
        <Text marginLeft="10" fontSize="x-large" color="white">
          clockwork
        </Text>
        <Spacer />
        <SearchBar />
        <Spacer />
        <UserButton />
      </Flex>
    </Box>
  );
}
