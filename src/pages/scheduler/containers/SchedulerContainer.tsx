import { useMemo } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { SchedulerCalendar } from '../components/SchedulerCalendar';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { CalendarEvent } from '../shared/types';

export function SchedulerContainer(): JSX.Element {
  const { term } = useParams();
  // the user's saved courses
  const { courses } = useSavedCourses();
  // augment the user's saved courses with section data pulled from the backend
  const coursesResult = useCalendarEvents(term, courses);

  // transform, filter etc. the users selected courses.
  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];
    if (coursesResult.status !== 'loaded') return [];

    coursesResult.data
      .filter((c) => !!c.selected)
      .forEach((course) => {
        for (const sectionType of [course.lecture, course.lab, course.tutorial]) {
          if (!sectionType) continue;
          const section = course.sections.find((s) => s.sectionCode === sectionType);
          if (section) {
            for (const meetingTime of section.meetingTimes) {
              events.push({
                subject: course.subject,
                code: course.code,
                meetingTime: meetingTime,
                sectionCode: sectionType,
                color: course.color ?? 'blue',
                textColor: 'black',
              });
            }
          }
        }
      });

    return events;
  }, [coursesResult]);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" px="3" py="2">
        <SchedulerCalendar calendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
