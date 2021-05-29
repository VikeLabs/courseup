import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useSavedCourses } from '../../shared/hooks/useSavedCourses';

import { CalendarEvent } from './components/CalendarEvent';
import { SchedulerCalendar } from './components/SchedulerCalendar';

export function SchedulerContainer(): JSX.Element {
  const { courses } = useSavedCourses();
  const { term } = useParams();

  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];

    courses.forEach((course) => {
      for (const sectionType of [course.lecture, course.lab, course.tutorial]) {
        if (sectionType) {
          for (const meetingTime of sectionType.meetingTimes) {
            if (course.selected && course.term === term) {
              events.push({
                subject: course.subject,
                code: course.code,
                meetingTime: meetingTime,
                sectionCode: sectionType.sectionCode,
                color: course.color ?? 'blue',
                textColor: course.textColor ?? 'black',
              });
            }
          }
        }
      }
    });

    return events;
  }, [courses, term]);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" px="3" py="2">
        <SchedulerCalendar calendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
