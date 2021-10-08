import { useMemo } from 'react';

import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { Header } from 'common/header';

import { useCalendarEvents } from 'pages/scheduler/hooks/useCalendarEvents';
import { CalendarEvent } from 'pages/scheduler/shared/types';

import { ImportButtons } from './components/ImportButtons';
import ImportCalendar from './components/ImportCalendar';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();

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
    <Flex h="100%" direction="column" overflow="hidden">
      <Header />
      <VStack spacing={8} pt={8}>
        <Heading>Importing Timetable {slug}</Heading>
        <ImportButtons />
        <ImportCalendar calendarEvents={calendarEvents} />
      </VStack>
    </Flex>
  );
}
