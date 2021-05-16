import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout';
import { useCallback, useState } from 'react';

import { MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { useSectionList } from '../../../shared/hooks/useSectionList';

import { SectionsCardContainer } from './SchedulerSections';

// GREEN, RED, YELLOW, BLUE, PURPLE, ORANGE
export const COLORS = ['#32a852', '#b33127', '#e8e523', '#247fe0', '#971dcc', '#cc7d1d'];

export function SchedulerSidebar(): JSX.Element {
  const { deleteCourse, setSection } = useSavedCourses();
  const [counter, setCounter] = useState(0);
  const sectionList = useSectionList();

  // useDefaultSections(sectionList);

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

  return (
    <Flex minW="25%" maxW="25%" grow={1} bg="#E4E4E4">
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Flex direction="column" overflowY="auto" overflowX="hidden">
          {sectionList.map((course, key) => {
            return (
              <VStack key={key}>
                <Heading>{`${course.subject} ${course.code}`}</Heading>
                <Box w="100%">
                  <SectionsCardContainer course={course} handleChange={handleChange} />
                </Box>
                <Button
                  style={{
                    backgroundColor: 'red',
                  }}
                  onClick={() =>
                    deleteCourse({
                      code: course.code,
                      pid: course.pid,
                      subject: course.subject,
                      term: course.term,
                      sections: [],
                    })
                  }
                >
                  remove
                </Button>
              </VStack>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
