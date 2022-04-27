import { Center, Spinner } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';
import { NotFound } from 'common/notfound/NotFound';

import { RegistrationHeading } from '../components/RegistrationHeading';

import { CourseContainer } from './CourseContainer';

export function RegistrationContainer(): JSX.Element | null {
  const { term } = useParams();
  const { courses } = useSavedCourses();

  // to avoid erroring out if term is not provided in URL
  // term is eventually filled in but need to avoid initial error
  if (!term)
    return (
      <Page title="Loading registration data..." mobileSupport>
        <Center height="100%" mt="10">
          <Spinner size="xl" />
        </Center>
      </Page>
    );

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
          <NotFound item="Unable to find saved courses from your" term={term} timetableButton timetable />
        )}
      </Box>
    </Page>
  );
}
