import { Button } from '@chakra-ui/button';
import { Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { useCallback } from 'react';

import { Header } from '../../app';
import { useSavedCourses } from '../../shared/hooks/storage/useSavedCourses';

type Course = {
  subject: string;
  code: string;
};

export function Home(): JSX.Element {
  const [data, addCourse, deleteCourse] = useSavedCourses('123');

  const onClick = useCallback(() => {
    addCourse('a pid');
  }, [addCourse]);

  const onClick1 = useCallback(() => {
    addCourse('another pid');
  }, [addCourse]);

  const onClick2 = useCallback(() => {
    deleteCourse('13804719238');
  }, [deleteCourse]);

  localStorage.clear();

  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Container>
        <Heading>We make school easier</Heading>
        <Button onClick={onClick}>yo</Button>
        <Button onClick={onClick1}>1</Button>
        <Button onClick={onClick2}>delete data</Button>
        <Text>{data}</Text>
      </Container>
    </Flex>
  );
}
