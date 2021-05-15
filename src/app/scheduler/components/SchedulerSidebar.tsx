import { Button } from '@chakra-ui/button';
import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { useCallback } from 'react';

import { MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { useSectionList } from '../../../shared/hooks/useSectionList';

export function SchedulerSidebar(): JSX.Element {
  const { deleteCourse, setSection } = useSavedCourses();
  const sectionList = useSectionList();

  const onClick = useCallback(
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
        { code, subject, term, pid }
      );
    },
    [setSection]
  );

  return (
    <Flex minW="25%" maxW="25%" grow={1} bg="#E4E4E4">
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Flex direction="column" overflowY="auto" overflowX="hidden">
          {sectionList.map((course, key) => {
            return (
              <VStack key={key}>
                <Heading>{`${course.subject} ${course.code}`}</Heading>
                {course.sections.map((section, key) => {
                  return (
                    <Button
                      onClick={() =>
                        // onClick(
                        //   section.sectionType,
                        //   section.sectionCode,
                        //   section.meetingTimes,
                        //   course.code,
                        //   course.subject,
                        //   course.pid,
                        //   course.term
                        // )
                        console.log(section.sectionCode)
                      }
                    >
                      {section.sectionCode}
                    </Button>
                  );
                })}
                <Button
                  style={{
                    backgroundColor: 'red',
                  }}
                  onClick={() =>
                    deleteCourse({ code: course.code, pid: course.pid, subject: course.subject, term: course.term })
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
