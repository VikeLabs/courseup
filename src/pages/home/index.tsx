import { Button } from '@chakra-ui/button';
import { Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { useCallback } from 'react';

import { Header } from '../../app';
import { useSavedCourses } from '../../shared/hooks/storage/useSavedCourses';

export function Home(): JSX.Element {
  const { addCourse } = useSavedCourses();

  const onClick = useCallback(() => {
    addCourse({ subject: 'CSC', code: '111', pid: 'abc123' });
  }, [addCourse]);

  const onClick1 = useCallback(() => {
    addCourse({ subject: 'MATH', code: '100', pid: '123abc' });
  }, [addCourse]);

  const onClick2 = useCallback(() => {
    // deleteAllCourses();
  }, []);

  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Container>
        <Heading>We make school easier</Heading>
        <Button onClick={onClick}>CSC 111</Button>
        <Button onClick={onClick1}>MATH 100</Button>
        <Button onClick={onClick2}>delete all</Button>
        <Text>{JSON.stringify([{ hi: 'hello' }])}</Text>
      </Container>
    </Flex>
  );
}
