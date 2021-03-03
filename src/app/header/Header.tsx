import React from "react";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import { SearchBar } from "./components/SearchBar";
import { UserButton } from "./components/UserButton";
import { TermButtons } from "./components/TermButtons";

export interface HeaderProps {
  /**
   * setTerm: changes the state of the term selected with the buttons
   */
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Primary UI component for content
 */
export const Header: React.FC<HeaderProps> = ({ setTerm }) => {
  return (
    <Box bg="tomato" h={66} px="10" py="4" overflow="hidden">
      <Flex minW="1280px">
        {/* TODO: turn this into a logo */}
        <Box w={225} textAlign="center">
          <Text fontSize="x-large" color="white" fontWeight="bold">
            clockwork
          </Text>
        </Box>
        <Spacer />
        <HStack spacing="10px">
          <SearchBar />
          <TermButtons setTerm={setTerm} />
        </HStack>
        <Spacer />
        <UserButton />
      </Flex>
    </Box>
  );
};
