import { Box, Flex } from '@chakra-ui/react';

import { SchedulerCalendar, SchedulerCalendarProps } from './components/SchedulerCalendar';

export function SchedulerContainer({ calendarEvents }: SchedulerCalendarProps): JSX.Element {
  return (
    <Flex grow={1} height="100%" overflow="hidden">
      <Box w="100%" height="100%" p="2em">
        <SchedulerCalendar calendarEvents={calendarEvents} />
      </Box>
    </Flex>
  );
}
