import { PropsWithChildren } from 'react';

import { Box, Heading } from '@chakra-ui/layout';
import { Flex, Center } from '@chakra-ui/react';

import { CourseShieldProps } from './Course';

export function Shield({ title, children, bg }: PropsWithChildren<CourseShieldProps>): JSX.Element {
  return (
    <Flex mx={{ base: 0, md: 2 }} w={{ base: '100%', md: 'fit-content' }} mr="2">
      <Box
        bg="gray.100"
        p="1"
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
        w={{ base: '50%', md: 'fit-content' }}
        textAlign="center"
      >
        <Heading size="sm" color="gray.600" px="2">
          {title}
        </Heading>
      </Box>
      <Center
        bg={bg}
        p="1"
        px="2"
        borderBottomRightRadius="md"
        borderTopRightRadius="md"
        color="black"
        w={{ base: '50%', md: 'fit-content' }}
        alignItems="baseline"
      >
        {children}
      </Center>
    </Flex>
  );
}
