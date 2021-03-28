import { Box, Heading } from '@chakra-ui/react';

import { SchedulerCalendar } from './components/SchedulerCalendar';

export interface CalendarProps {}

/**
 * Primary UI component for content
 */
export function Scheduler(): JSX.Element {
  return (
    <Box w="100%" height="100%">
      <SchedulerCalendar />
    </Box>
  );
}
