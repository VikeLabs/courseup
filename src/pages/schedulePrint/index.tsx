import { useMemo } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { SchedulerCalendar } from 'pages/scheduler/components/SchedulerCalendar';
import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

export function SchedulePrint(): JSX.Element {
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
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" px="3" py="2">
        <SchedulerCalendar term={term} courseCalendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
