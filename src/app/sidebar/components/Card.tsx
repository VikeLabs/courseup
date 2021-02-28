import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Colors } from "../shared/styles";

export interface CardProps {
  title: string;
  subject: string;
  code: string;
  selected?: boolean;
}

export function Card(props: CardProps): JSX.Element {  
  return (
    <Box bgColor={props.selected ? Colors.orange200 : Colors.white} color={Colors.black} m="5" p="4">
      <Heading as="h3" size="md">
        {props.subject} {props.code}
      </Heading>
      <Heading as="h4" color={Colors.grey} size="sm">
        {props.title}
      </Heading>
    </Box>
  );
}