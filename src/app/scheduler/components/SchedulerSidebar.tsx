import { Button } from '@chakra-ui/button';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { useCallback, useState } from 'react';

import { MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

import { CourseCard } from './CourseCard';
import { SectionsCardContainer } from './SchedulerSections';

// GREEN, RED, YELLOW, BLUE, PURPLE, ORANGE
export const COLORS = ['#32a852', '#b33127', '#e8e523', '#247fe0', '#971dcc', '#cc7d1d'];

interface SchedulerSidebarProps {
  term: string;
}

export function SchedulerSidebar({ term }: SchedulerSidebarProps): JSX.Element {
  const { deleteCourse, setSection, courses, setSelected, clearCourses } = useSavedCourses();
  const [counter, setCounter] = useState(0);

  const handleCourseSectionChange = useCallback(
    (
      sectionType: string,
      sectionCode: string,
      meetingTimes: MeetingTimes[],
      code: string,
      subject: string,
      pid: string,
      term: string
    ) => {
      setSection(
        sectionType,
        {
          sectionCode,
          meetingTimes,
        },
        { code, subject, term, pid, sections: [] }
      );
      console.log(counter, COLORS[counter]);
      setCounter(counter + 1);
    },
    [counter, setSection]
  );

  const handleCourseDelete = useCallback(
    ({ code, pid, subject, term }: { code: string; pid: string; subject: string; term: string }) => {
      deleteCourse({
        code,
        pid,
        subject,
        term,
        sections: [],
      });
    },
    [deleteCourse]
  );

  const handleCourseToggle = useCallback(
    ({
      code,
      pid,
      subject,
      term,
      selected,
    }: {
      code: string;
      pid: string;
      subject: string;
      term: string;
      selected?: boolean;
    }) => {
      setSelected(!selected, { code, pid, subject, term, sections: [] });
    },
    [setSelected]
  );

  return (
    <Flex
      minW="25%"
      maxW="25%"
      bg="#E4E4E4"
      overflowY="auto"
      direction="column"
      boxShadow="md"
      justifyContent="space-between"
    >
      <Box
        bg="white"
        top="0"
        m="0"
        boxShadow="md"
        zIndex={10}
        borderColor="gray.200"
        borderBottomWidth="2px"
        borderBottomStyle="solid"
      >
        <Flex justifyContent="space-between" alignItems="center" p="3">
          <Text>Saved Courses</Text>
          <Flex>
            <Button size="xs" colorScheme="red" onClick={() => clearCourses()} disabled>
              Clear
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box h="100%" overflow="auto">
        {courses
          .filter((course) => course.term === term)
          .map((course, key) => (
            <VStack key={key} mt="1" spacing="0">
              <CourseCard
                term={course.term}
                subject={course.subject}
                code={course.code}
                color={course.color}
                pid={course.pid}
                selected={course.selected}
                handleSelection={handleCourseToggle}
                handleDelete={handleCourseDelete}
              />
              <Collapse in={course.selected} animateOpacity style={{ width: '100%' }}>
                <SectionsCardContainer course={course} courses={courses} handleChange={handleCourseSectionChange} />
              </Collapse>
            </VStack>
          ))}
      </Box>
      <Box
        bg="white"
        top="0"
        m="0"
        boxShadow="md"
        zIndex={10}
        borderColor="gray.200"
        borderBottomWidth="2px"
        borderBottomStyle="solid"
      >
        {/* TODO: summary for course registration */}
        {/* <Flex justifyContent="space-between" alignItems="center" p="3">
          <Button size="xs" colorScheme="green">
            Summary
          </Button>
        </Flex> */}
      </Box>
    </Flex>
  );
}
