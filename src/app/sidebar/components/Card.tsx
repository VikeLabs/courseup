import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export interface CardProps {
  title: string;
  subject: string;
  code: string;
  selected?: boolean;
}

export function Card(props: CardProps): JSX.Element {  
  return (
    <Box bgColor={props.selected ? 'orange.200' : 'white'} color="black" m="5" p="4">
      <Heading as="h3" size="md">
        {props.subject} {props.code}
      </Heading>
      <Heading as="h4" color="grey" size="sm">
        {props.title}
      </Heading>
    </Box>
  );
}