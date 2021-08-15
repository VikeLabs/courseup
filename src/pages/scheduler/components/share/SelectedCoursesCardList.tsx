import { Box, Flex, Heading, HStack, VStack, Wrap, WrapItem, Text } from '@chakra-ui/react';

import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

type ShareCourseCard_Props = {
  course: SavedCourse;
};

const ShareCourseCard = ({ course }: ShareCourseCard_Props) => {
  return (
    <Flex height="100%" direction="column">
      <HStack w="100%" bg="#EDF2F7" justifyContent="center" p="0.2em" borderTopRadius="4px" padding="4px">
        <Heading size="xs">
          {course.subject} {course.code}
        </Heading>
      </HStack>
      <VStack bg={course.color} flex={1} justifyContent="center" borderBottomRadius="4px" padding="4px">
        <Heading justifyContent="center" size="sm">
          {course.lecture} {course.lab} {course.tutorial}
        </Heading>
      </VStack>
    </Flex>
  );
};

type SelectedCoursesTable_Props = {
  courses: SavedCourse[];
  term: string;
};

export function SelectedCoursesCardList({ courses, term }: SelectedCoursesTable_Props): JSX.Element {
  return (
    <Wrap variant="striped">
      {courses.length > 0 ? (
        courses.map((course) => {
          if (course.lecture || course.lab || course.tutorial) {
            return (
              <WrapItem>
                <ShareCourseCard course={course} />
              </WrapItem>
            );
          }
          return null;
        })
      ) : (
        <Text>
          Unable to find saved courses for <Box as="strong"> {getReadableTerm(term || '')} </Box>
        </Text>
      )}
    </Wrap>
  );
}
