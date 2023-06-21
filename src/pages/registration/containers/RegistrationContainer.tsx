import { Center, Spinner, Box } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';
import { NotFound } from 'common/notFound/NotFound';

import { RegistrationHeading } from '../components/RegistrationHeading';

import { CourseContainer } from './CourseContainer';

export function RegistrationContainer(): JSX.Element | null {
  // TODO: the useTerm hook breaks this page completely - I've gone back to the original implementation as a hotfix
  // const [term] = useTerm();
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
            .map((course, i) => <CourseContainer key={`${course.subject}${course.code}_${i}`} course={course} />)
        ) : (
          <NotFound term={term} timetable>
            Unable to find saved courses from your timetable for
          </NotFound>
        )}
      </Box>
    </Page>
  );
}
