import { Box, Container, Divider, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
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

  return (
    <Page title={`${getReadableTerm(term)} · Registration`} mobileSupport>
      <Box maxW={{ base: '35rem', md: '65rem' }} textAlign="center" pt="1.25rem">
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
