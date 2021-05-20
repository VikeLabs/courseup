import { Box, Flex, VStack } from '@chakra-ui/layout';
import { useCallback, useState } from 'react';

import { MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

import { CourseCard } from './CourseCard';
import { SectionsCardContainer } from './SchedulerSections';

// GREEN, RED, YELLOW, BLUE, PURPLE, ORANGE
export const COLORS = ['#32a852', '#b33127', '#e8e523', '#247fe0', '#971dcc', '#cc7d1d'];

export function SchedulerSidebar(): JSX.Element {
  const { deleteCourse, setSection, courses, setSelected } = useSavedCourses();
  const [counter, setCounter] = useState(0);

  const handleChange = useCallback(
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

  const handleDelete = useCallback(
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

  const handleSelection = useCallback(
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
    <Flex minW="25%" maxW="25%" bg="#E4E4E4" overflowY="auto" direction="column">
      {courses.map((course, key) => (
        <VStack key={key} mt="5px" spacing="0">
          <CourseCard
            term={course.term}
            subject={course.subject}
            code={course.code}
            color={course.color}
            pid={course.pid}
            selected={course.selected}
            handleSelection={handleSelection}
            handleDelete={handleDelete}
          />
          {course.selected && (
            <Box w="100%">
              <SectionsCardContainer course={course} handleChange={handleChange} />
            </Box>
          )}
        </VStack>
      ))}
    </Flex>
  );
}
