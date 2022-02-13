import { Box, Container, Divider, Heading } from '@chakra-ui/layout';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';

import { RegistrationHeading } from '../components/RegistrationHeading';

import { CourseContainer } from './CourseContainer';

export function RegistrationContainer(): JSX.Element | null {
  const { term } = useParams();
  const { courses } = useSavedCourses();
  const mode = useDarkMode();

  // to avoid erroring out if term is not provided in URL
  // term is eventually filled in but need to avoid initial error
  if (!term)
    return (
      <Page title="Loading registration data...">
        <Center height="100%" mt="10">
          <Spinner size="xl" />
        </Center>
      </Page>
    );

  return (
    <Page title={`${getReadableTerm(term)} · Registration`}>
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
              <Heading size="md" color={mode('gray', 'dark.header')}>
                Unable to find saved courses for{' '}
                <Text as="span" color={mode('black', 'white')}>
                  {getReadableTerm(term)}
                </Text>
              </Heading>
            </Container>
          </>
        )}
      </Box>
    </Page>
  );
}
