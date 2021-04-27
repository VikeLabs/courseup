import { Box, Heading, Spinner } from '@chakra-ui/react';

import { Course, useGetCourse, useGetCourses, useSections } from '../../fetchers';

import { SchedulerCalendar } from './components/SchedulerCalendar';

export interface CalendarProps {}

/**
 * Primary UI component for content
 */
export function Scheduler(): JSX.Element {
  const term = '202105';
  const subject = 'MATH';
  const code = '101';
  const { data: scehdulelisting } = useSections({ term, queryParams: { subject, code } });

  return (
    <Box w="100%" height="100%">
      {scehdulelisting && (
        <SchedulerCalendar
          calendarEvents={(() => {
            const x = new Array();
            x.push({
              subject: subject,
              code: code,
              color: 'green',
              sectionCode: scehdulelisting[0].sectionCode,
              meetingTime: scehdulelisting[0].meetingTimes[0],
            });
            return x;
          })()}
        />
      )}
    </Box>
  );
}
