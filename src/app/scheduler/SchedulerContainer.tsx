import { Box, Flex } from '@chakra-ui/react';

import { Course, useSavedCourses } from '../../shared/hooks/useSavedCourses';
import { useSectionList } from '../../shared/hooks/useSectionList';

import { CalendarEvent } from './components/CalendarEvent';
import { SchedulerCalendar, SchedulerCalendarProps } from './components/SchedulerCalendar';

export function SchedulerContainer(): JSX.Element {
  const { courses } = useSavedCourses();
  const sectionList = useSectionList(courses);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" p="2em">
        <SchedulerCalendar
          calendarEvents={(() => {
            const list: CalendarEvent[] = [];

            sectionList.forEach((section) => {
              list.push({
                subject: section.subject,
                code: section.code,
                meetingTime: section.section.meetingTimes[0],
                sectionCode: 'AO1',
                color: '#' + Math.floor(Math.random() * 16),
              });
            });

            return list;
          })()}
        />
      </Box>
    </Flex>
  );
}
