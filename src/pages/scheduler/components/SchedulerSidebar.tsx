import { useCallback } from 'react';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { Link } from 'react-router-dom';

import { MeetingTimes } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { useCalendarEvents } from '../hooks/useCalendarEvents';

import { CourseCard } from './CourseCard';
import { SectionsCardContainer } from './SchedulerSections';

// GREEN, RED, YELLOW, BLUE, PURPLE, ORANGE
export const COLORS = ['#32a852', '#b33127', '#e8e523', '#247fe0', '#971dcc', '#cc7d1d'];

interface SchedulerSidebarProps {
  term: string;
}

export function SchedulerSidebar({ term }: SchedulerSidebarProps): JSX.Element {
  const { deleteCourse, setSection, setShowSections, courses, setSelected, clearCourses } = useSavedCourses();
  const coursesResult = useCalendarEvents(term, courses);

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
        {
          code,
          subject,
          term,
          pid,
        }
      );
    },
    [setSection]
  );

  const handleCourseDelete = useCallback(
    ({ code, pid, subject, term }: { code: string; pid: string; subject: string; term: string }) => {
      deleteCourse({
        code,
        pid,
        subject,
        term,
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
      setSelected(!selected, {
        code,
        pid,
        subject,
        term,
      });
    },
    [setSelected]
  );

  const handleShowSections = useCallback(
    ({
      code,
      pid,
      subject,
      term,
      showSections,
    }: {
      code: string;
      pid: string;
      subject: string;
      term: string;
      showSections?: boolean;
    }) => {
      setShowSections(!showSections, {
        code,
        pid,
        subject,
        term,
      });
    },
    [setShowSections]
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
            <Button
              size="xs"
              mr="1"
              colorScheme="blue"
              disabled={courses.filter((course) => course.term === term).length === 0}
              as={Link}
              to={`/registration/${term}`}
            >
              Register
            </Button>
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => clearCourses(term)}
              disabled={courses.filter((course) => course.term === term).length === 0}
            >
              Clear
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box h="100%" overflow="auto" pb="20">
        {coursesResult.status === 'loaded' &&
          coursesResult.data
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
                  showSections={course.showSections}
                  handleSelection={handleCourseToggle}
                  handleDelete={handleCourseDelete}
                  handleShowSections={handleShowSections}
                />
                <Collapse in={course.showSections} animateOpacity style={{ width: '100%' }}>
                  <SectionsCardContainer
                    course={course}
                    courses={courses}
                    sections={course.sections}
                    handleChange={handleCourseSectionChange}
                  />
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
      />
    </Flex>
  );
}
