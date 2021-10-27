import { useMemo } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { Box, Flex } from '@chakra-ui/layout';

import { Timetable } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { SchedulerCalendar } from 'pages/scheduler/components/SchedulerCalendar';
import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

export const ImportCalendar = ({ data }: { data: Timetable }): JSX.Element => {
  //console.log(data);

  const { courses, term } = data;

  const parsedCourses: SavedCourse[] = useMemo(
    () =>
      courses.map((course) => {
        return {
          subject: course.subject,
          pid: course.pid,
          code: course.code,
          term: term,
          lecture: course.lecture ? course.lecture[0] : undefined,
          lab: course.lab ? course.lab[0] : undefined,
          tutorial: course.tutorial ? course.tutorial[0] : undefined,
          color: course.color,
          selected: true,
        };
      }),
    [courses, term]
  );

  // extend the list of courses with section information
  const coursesResult = useGetCourseSections(term, parsedCourses);

  // transform, filter etc. the users selected courses.
  const calendarEvents = useMemo(
    () => denormalizeCourseEvents(coursesResult.status === 'loaded' ? coursesResult.data : []),
    [coursesResult]
  );

  console.log(calendarEvents);

  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" px="3" py="2">
        <SchedulerCalendar term={term} courseCalendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
};
