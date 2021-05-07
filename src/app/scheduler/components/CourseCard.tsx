import { AddIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton, Link } from '@chakra-ui/react';
import { useCallback } from 'react';

import { Term } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

export type CourseCardProps = {
  term: Term;
  subject: string;
  title: string;
  code: string;
  colour: string;
  pid: string;
  selected: boolean;
  handleChange: Function;
};

export function CourseCard({
  term,
  subject,
  title,
  code,
  colour,
  pid,
  handleChange,
  selected,
}: CourseCardProps): JSX.Element {
  const { addCourse, deleteCourse, contains } = useSavedCourses();
  const courseIsSaved = contains(pid, term);

  const onCourseClick = useCallback(() => {
    if (term && pid !== '' && code !== '') {
      if (!courseIsSaved) {
        addCourse({ subject, code, pid, term });
      } else {
        deleteCourse({ subject, code, pid, term });
      }
    }
  }, [term, pid, code, courseIsSaved, addCourse, subject, deleteCourse]);

  const onChange = useCallback(() => {
    handleChange();
  }, [handleChange]);

  return (
    <Box boxShadow="md" cursor="pointer">
      <Flex direction="row" background={!selected ? 'blackAlpha.200' : 'white'}>
        <Flex background={colour} alignItems="center" justifyContent="center" mr="10px">
          <Flex>
            <Checkbox
              backgroundColor="whiteAlpha.600"
              colorScheme="whiteAlpha"
              iconColor="black"
              size="lg"
              mx="7px"
              isChecked={selected}
              onChange={onChange}
            />
          </Flex>
        </Flex>
        <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%">
          <VStack alignItems="start" spacing="0" py="2">
            <Text fontSize="lg" fontWeight="bold">
              {subject} {code}
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              {title}
            </Text>
          </VStack>
          <VStack alignContent="right" pr="5px" py="5px">
            <IconButton
              aria-label="Add to Scheduler"
              icon={!courseIsSaved ? <AddIcon color="white" /> : <CloseIcon color="white" />}
              background={!courseIsSaved ? 'green.400' : 'red'}
              size="sm"
              onClick={onCourseClick}
            />
            <IconButton
              aria-label="More information"
              icon={<InfoOutlineIcon color="white" />}
              size="sm"
              background="blue.400"
              as={Link}
              to={`/calendar/${term}/${subject}?pid=${pid}`}
            />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
