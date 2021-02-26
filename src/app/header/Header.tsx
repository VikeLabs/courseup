import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { SearchBar } from "./components/SearchBar";
import { UserButton } from "./components/UserButton";

// TODO: make this better responsive, good for now
const HeaderFlex = styled(Flex)`
  min-width: 1280px;
`;

const HeaderContainer = styled(Box)`
  overflow: auto;
  overflow-y: hidden;
`;

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ setTerm }: Props) {
  return (
    <HeaderContainer bg="#ff9636" h={66} px="10" py="4">
      <HeaderFlex>
        {/* TODO: turn this into a logo */}
        <Box w={225} textAlign="center">
          <Text fontSize="x-large" color="white" fontWeight="bold">
            clockwork
          </Text>
        </Box>
        <Spacer />
        <SearchBar setTerm={setTerm} />
        <Spacer />
        <UserButton />
      </HeaderFlex>
    </HeaderContainer>
  );
}
