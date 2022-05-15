import { Flex, Heading, HStack, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { NotFound } from 'common/notFound/NotFound';

export const ShareCourseCard = ({ subject, code, color, lecture, lab, tutorial }: SavedCourse) => {
  const mode = useDarkMode();
  return (
    <Flex height="100%" direction="column" data-testid="card">
      <HStack w="100%" bg={mode('gray.100', 'gray.600')} justifyContent="center" p="0.3em" borderTopRadius="4px">
        <Heading size="xs">
          {subject} {code}
        </Heading>
      </HStack>
      <VStack bg={color} flex={1} justifyContent="center" borderBottomRadius="4px" p="0.3em">
        <Heading justifyContent="center" size="sm">
          {lecture} {lab} {tutorial}
        </Heading>
      </VStack>
    </Flex>
  );
};

type SelectedCoursesTableProps = {
  courses: SavedCourse[];
  term: string;
};

export function SelectedCoursesCardList({ courses, term }: SelectedCoursesTableProps): JSX.Element {
  return (
    <Wrap>
      {courses.length > 0 ? (
        courses.map((course) => {
          if (course.lecture || course.lab || course.tutorial) {
            return (
              <WrapItem key={`${course.subject}${course.code}`}>
                <ShareCourseCard {...course} />
              </WrapItem>
            );
          }
          return null;
        })
      ) : (
        <NotFound term={term}> Unable to find saved courses for</NotFound>
      )}
    </Wrap>
  );
}
