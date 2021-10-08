import { useMemo } from 'react';

import { Flex, Heading, VStack } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { Header } from 'common/header';

import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

import { ImportButtons } from './components/ImportButtons';
import { ImportCalendar } from './components/ImportCalendar';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();

  const { term } = useParams();
  // the user's saved courses
  const { courses } = useSavedCourses();
  // extend the list of courses with section information
  const coursesResult = useGetCourseSections(term, courses);
  // transform, filter etc. the users selected courses.
  const calendarEvents = useMemo(
    () => denormalizeCourseEvents(coursesResult.status === 'loaded' ? coursesResult.data : []),
    [coursesResult]
  );

  return (
    <Flex h="100%" direction="column" overflow="hidden">
      <Header />
      <VStack spacing={8} pt={8}>
        <Heading>Importing Timetable {slug}</Heading>
        <ImportButtons />
        <ImportCalendar term={term} courseCalendarEvents={calendarEvents} />
      </VStack>
    </Flex>
  );
}
