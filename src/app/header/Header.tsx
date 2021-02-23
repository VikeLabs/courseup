import { Box, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "./components/SearchBar";
import { TermButtons } from "./components/TermButtons";
import { UserButton } from "./components/UserButton";

export function Header() {
  return (
    <Box bg="tomato" h={66} p="4">
      <Flex>
        <Text marginLeft="10" fontSize="x-large">
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
