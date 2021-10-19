import { useMemo } from 'react';

// import { useParams } from 'react-router';
import { Heading, VStack, Box } from '@chakra-ui/layout';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { Header } from 'common/header';

import { ImportButtons } from './components/ImportButtons';
import { ImportCalendar } from './components/ImportCalendar';
import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

export function ImportTimetable(): JSX.Element {
  // const { slug } = useParams();

  // const sample_slug = 'FPfGNnbdEiSI';

  const term = '202109';
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
    <>
      <Header />
      <VStack p={50} spacing={10}>
        <Heading>Importing Timetable</Heading>
        <ImportButtons />
      </VStack>
      <VStack>
        <Box w="70%">
          <ImportCalendar term={term} courseCalendarEvents={calendarEvents} />
        </Box>
      </VStack>
    </>
  );
}
