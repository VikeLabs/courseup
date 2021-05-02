import { ChevronRightIcon, PlusSquareIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, IconButton } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

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

  /**
   * Boolean to check if in schedule mode
   */
  schedule?: boolean;
}

export function Card({ subject, title, code, selected, schedule }: PropsWithChildren<CardProps>): JSX.Element {
  const buttons = (code: string | undefined, schedule: boolean | undefined) => {
    if (!code) {
      return (
        <Box>
          <IconButton
            aria-label="Select course"
            icon={<ChevronRightIcon />}
            size="md"
            background="null"
            _hover={{ bg: 'none' }}
          />
        </Box>
      );
    } else if (code && schedule) {
      return (
        <VStack spacing="-0">
          <IconButton
            aria-label="Add to Scheduler"
            icon={<PlusSquareIcon color="green" />}
            size="sm"
            background="null"
          />
          <IconButton
            aria-label="More information"
            icon={<InfoOutlineIcon color="blue.400" />}
            size="sm"
            background="null"
          />
        </VStack>
      );
    }
  };

  return (
    <Box
      bgColor={selected ? undefined : 'white'}
      bgGradient={selected ? 'linear(to-l, #2e95d1, #7cbce2)' : undefined}
      color={selected ? 'white' : 'black'}
      boxShadow="md"
      py={2}
      px={4}
      my={1}
      cursor="pointer"
      _hover={{
        bgGradient: schedule ? undefined : selected ? undefined : 'linear(to-l, #39c686, #80dbb1)',
        color: schedule ? undefined : 'white',
      }}
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <VStack alignItems="start" spacing="0">
          <Text fontSize="lg" fontWeight="bold" p={0} m={0}>
            {subject} {code}
          </Text>
          <Text fontSize="sm" fontWeight="normal" p={0} m={0}>
            {title}
          </Text>
        </VStack>
        {buttons(code, schedule)}
      </Flex>
    </Box>
  );
}
