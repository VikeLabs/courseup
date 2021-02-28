import { Box, Heading } from "@chakra-ui/react";
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
    <Box as="button" bgColor={props.selected ? 'orange.200' : 'white'} borderRadius="md" color="black" m="5" p="4">
      <Heading as="h3" size="md">
        {props.subject} {props.code}
      </Heading>
      <Heading as="h4" color="grey" size="sm">
        {props.title}
      </Heading>
    </Box>
  );
}