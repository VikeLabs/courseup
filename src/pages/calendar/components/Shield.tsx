import { PropsWithChildren } from 'react';

import { Box, Heading } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';

import { CourseShieldProps } from './Course';

export function Shield({ title, children, bg }: PropsWithChildren<CourseShieldProps>): JSX.Element {
  return (
    <Flex mx="2">
      <Box bg="gray.100" p="1" borderTopLeftRadius="md" borderBottomLeftRadius="md">
        <Heading size="sm" color="gray.600" px="2">
          {title}
        </Heading>
      </Box>
      <Flex
        bg={bg}
        p="1"
        px="2"
        borderBottomRightRadius="md"
        borderTopRightRadius="md"
        color="black"
        alignItems="baseline"
      >
        {children}
      </Flex>
    </Flex>
  );
}
