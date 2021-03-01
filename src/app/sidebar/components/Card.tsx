import { Box, Text } from "@chakra-ui/react";
import React from "react";

export interface CardProps {
  /**
   * The title of course
   * EX) Software Development Methods
   */
  title: string;

  /**
   * Subject to be displayed
   * EX) SENG 265 -> SENG
   */
  subject: string;
  
  /**
   * Code to be displayed
   * EX) SENG 265 -> 265
   */
  code: string;

  /**
   * Boolean to check Card is selected by user
   */
  selected?: boolean;
}

export function Card(props: CardProps): JSX.Element {  
  return (
    <Box
      bgColor={props.selected ? "orange.200" : "white"}
      color="black"
      borderRadius="lg"
      boxShadow="md"
      m="3"
      p="3"
    >
      <Text fontSize="xs" fontWeight="semibold">
        {props.subject} {props.code}
      </Text>
      <Text color="grey" fontSize="xs">
        {props.title}
      </Text>
    </Box>
  );
}