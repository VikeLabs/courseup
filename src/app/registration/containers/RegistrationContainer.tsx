import { Box, Flex, Text } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { Header } from '../../header/Header';
import { RegistrationHeading } from '../components/RegistrationHeading';

import { CourseContainer } from './CourseContainer';

export function RegistrationContainer(): JSX.Element | null {
  const { term } = useParams();
  const { courses } = useSavedCourses();

  return (
    <Flex h="100vh" direction="column" overflowX="hidden">
      <Helmet>
        <title>{`${term} · Registration`}</title>
      </Helmet>
      <Header />
      <Flex width="100%" mt="20px" direction="column" alignItems="center">
        <Box width={['container.md', 'container.lg', 'container.xl']} textAlign="center">
          <RegistrationHeading />
          {courses
            .filter((course) => course.term === term)
            .map((course) => {
              return <CourseContainer course={course} />;
            })}
        </Box>
      </Flex>
    </Flex>
  );
}
