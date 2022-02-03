import { Box, Flex } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { Header } from 'common/header';

import { RegistrationHeading } from '../components/RegistrationHeading';
import { RegistrationNotFound } from '../components/RegistrationNotFound';

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
            <RegistrationNotFound />
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
