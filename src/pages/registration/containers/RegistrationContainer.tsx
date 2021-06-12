import { Box, Divider, Flex, Heading } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { Feedback } from '../../../common/feedback/Feedback';
import { Header } from '../../../common/header/Header';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { getReadableTerm } from '../../../shared/utils/terms';
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
      <Flex width="100%" pt="20px" direction="column" alignItems="center" overflowY="auto">
        <Box maxW={{ md: '65rem', sm: '35rem', base: '20rem' }} textAlign="center">
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
              <Heading size="md" color="gray">
                Unable to find saved courses for{' '}
                <Box as="span" color="black">
                  {getReadableTerm(term)}
                </Box>
              </Heading>
            </>
          )}
        </Box>
      </Flex>
      <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
        <Feedback />
      </Box>
    </Flex>
  );
}
