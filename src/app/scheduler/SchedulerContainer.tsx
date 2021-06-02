import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { useSavedCourses } from '../../shared/hooks/useSavedCourses';

import { CalendarEvent } from './components/CalendarEvent';
import { SchedulerCalendar } from './components/SchedulerCalendar';
import { useCalendarEvents } from './hooks/useCalendarEvents';

export function SchedulerContainer(): JSX.Element {
  // // const [eventResult, events] = useCalendarEvents();

  // const yo = useCalendarEvents();
  // // yo?.status === 'loaded' && console.log('sup', yo.data);
  const { courses } = useSavedCourses();
  const { term } = useParams();
  const func = useCalendarEvents();

  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];

    courses.forEach(async (course) => {
      for (const sectionType of [course.lecture, course.lab, course.tutorial]) {
        if (sectionType) {
          const meetingTimes = await func({ subject: course.subject, code: course.code, sectionCode: sectionType });
          for (const meetingTime of meetingTimes) {
            if (course.selected && course.term === term) {
              events.push({
                subject: course.subject,
                code: course.code,
                meetingTime: meetingTime,
                sectionCode: sectionType,
                color: course.color ?? 'blue',
                textColor: course.textColor ?? 'black',
              });
            }
          }
        }
      }
    });

    return events;
  }, [courses, func, term]);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" px="3" py="2">
        <SchedulerCalendar calendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
