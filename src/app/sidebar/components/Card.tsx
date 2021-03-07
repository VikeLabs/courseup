import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, IconButton } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

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
  code?: string;

  /**
   * Boolean to check Card is selected by user
   */
  selected?: boolean;
}

export function Card({ subject, title, code, selected }: PropsWithChildren<CardProps>): JSX.Element {
  return (
    <Box
      bgColor={selected ? 'orange.200' : 'white'}
      color="black"
      borderRadius="lg"
      boxShadow="md"
      p="1em"
      m="0.5em"
      cursor="pointer"
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <VStack alignItems="start">
          <Text fontSize="sm" color="black" fontWeight="bold">
            {subject} {code}
          </Text>
          <Text fontSize="xs" color="black" fontWeight="normal">
            {title}
          </Text>
        </VStack>
        {!code && (
          <IconButton p="0.5em" background="none" aria-label="See Courses" size="xs" icon={<ChevronRightIcon />} />
        )}
      </Flex>
    </Box>
  );
}
