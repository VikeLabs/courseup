import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';

import { useSavedCourses } from '../../shared/hooks/useSavedCourses';

import { CalendarEvent } from './components/CalendarEvent';
import { SchedulerCalendar } from './components/SchedulerCalendar';

export function SchedulerContainer(): JSX.Element {
  const { courses } = useSavedCourses();

  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];

    courses.forEach((course) => {
      for (const sectionType of [course.lecture, course.lab, course.tutorial]) {
        if (sectionType !== undefined) {
          for (const meetingTime of sectionType.meetingTimes) {
            events.push({
              subject: course.subject,
              code: course.code,
              meetingTime: meetingTime,
              sectionCode: sectionType.sectionCode,
              color: sectionType.color ?? 'blue',
              textColor: sectionType.textColor ?? 'black',
            });
          }
        }
      }
    });

    return events;
  }, [courses]);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" p="2em">
        <SchedulerCalendar calendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
