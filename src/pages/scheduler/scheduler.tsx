import { Flex, Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React from 'react';

import { Header } from '../../app';
import { CourseCard } from '../../app/content/scheduler/components/CourseCard';

export function Scheduler(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Heading>COURSE CARDS</Heading>
      <Box w="50vw" justifySelf="center">
        <CourseCard title="Test" subject="subject" colour="orange" />
        <CourseCard title="Test" subject="subject" colour="red" />
        <CourseCard title="Test" subject="subject" colour="green" />
        <CourseCard title="Test" subject="subject" colour="orange" />
        <CourseCard title="Test" subject="subject" colour="red" />
        <CourseCard title="Test" subject="subject" colour="green" />
      </Box>
    </Flex>
  );
}
