import { useMemo } from 'react';

import { Box } from '@chakra-ui/layout';

import { Timetable } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getCurrentTerm } from 'lib/utils/terms';

import { SchedulerCalendar } from 'pages/scheduler/components/SchedulerCalendar';
import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

export const ImportCalendar = ({ timetableCourses }: { timetableCourses: Timetable }): JSX.Element => {
  const { courses, term } = timetableCourses;

  const parsedCourses: SavedCourse[] = useMemo(
    () =>
      courses.map(({ subject, pid, code, lecture, lab, tutorial, color }) => {
        return {
          subject,
          pid,
          code,
          term,
          lecture: lecture ? lecture[0] : undefined,
          lab: lab ? lab[0] : undefined,
          tutorial: tutorial ? tutorial[0] : undefined,
          color,
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

  return (
    <Box w="100%" px="3" pb="14" h="100%">
      <SchedulerCalendar term={term || getCurrentTerm()} courseCalendarEvents={calendarEvents} />
    </Box>
  );
};
