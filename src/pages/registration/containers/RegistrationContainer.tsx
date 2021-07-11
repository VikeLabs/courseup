import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

import { Header } from 'common/header';

import { RegistrationHeading } from '../components/RegistrationHeading';

import { CourseContainer } from './CourseContainer';

export function RegistrationContainer(): JSX.Element | null {
  const { term } = useParams();
  const { courses } = useSavedCourses();

  return (
    <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
      <Helmet>
        <title>{`${getReadableTerm(term)} · Registration`}</title>
      </Helmet>
      <Header />
      <Flex width="100%" pt="1.25rem" direction="column" alignItems="center" overflowY="auto">
        <Box maxW={{ base: '35rem', md: '65rem' }} textAlign="center">
          <RegistrationHeading />
          {courses.filter((course) => course.term === term).length > 0 ? (
            courses
              .filter((course) => course.term === term)
              .map((course) => {
                return <CourseContainer course={course} />;
              })
          ) : (
            <>
              <Divider my="4" />
              <Container alignItems="center" maxW="container.xl">
                <Heading size="md" color="gray">
                  Unable to find saved courses for{' '}
                  <Box as="span" color="black">
                    {getReadableTerm(term)}
                  </Box>
                </Heading>
              </Container>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
