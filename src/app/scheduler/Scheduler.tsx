import { Box, Heading, Spinner } from '@chakra-ui/react';

import { Course, useGetCourse, useGetCourses, useSections } from '../../fetchers';

import { SchedulerCalendar } from './components/SchedulerCalendar';

export interface CalendarProps {}

/**
 * Primary UI component for content
 */
export function Scheduler(): JSX.Element {
  const term = '202105';
  const { data: courses } = useGetCourses({ term });

  return (
    <Box w="100%" height="100%">
      {/* {courses != undefined && <SchedulerCalendar courses={courses} />} */}
      <SchedulerCalendar />
    </Box>
  );
}
