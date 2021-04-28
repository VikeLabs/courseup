import { Box } from '@chakra-ui/react';

import { useSections } from '../../shared/fetchers';

import { SchedulerCalendar } from './components/SchedulerCalendar';

export interface CalendarProps {}

/**
 * Primary UI component for content
 */
export function SchedulerContainer(): JSX.Element {
  const term = '202101';
  const subject = 'CSC';
  const code = '226';
  const { data: scehdulelisting } = useSections({ term, queryParams: { subject, code } });

  return (
    <Box w="100%" height="100%" p="2em">
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
