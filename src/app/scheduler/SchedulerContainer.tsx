import { Box, Flex } from '@chakra-ui/react';

import { useSections } from '../../shared/fetchers';

import { SchedulerCalendar } from './components/SchedulerCalendar';

export interface CalendarProps {}

/**
 * Primary UI component for content
 */
export function SchedulerContainer(): JSX.Element {
  const term = '202105';
  const subject = 'ECE';
  const code = '310';
  const { data: scehdulelisting } = useSections({ term, queryParams: { subject, code } });

  return (
    <Flex height="100%" overflow="hidden">
      <Box w="100%" height="100%" p="2em">
        {scehdulelisting && (
          <SchedulerCalendar
            calendarEvents={(() => {
              const x = new Array();
              x.push({
                subject: subject,
                code: code,
                color: 'green',
                sectionCode: scehdulelisting[2].sectionCode,
                meetingTime: scehdulelisting[2].meetingTimes[0],
              });
              return x;
            })()}
          />
        )}
      </Box>
    </Flex>
  );
}
