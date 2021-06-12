import { Box, Flex, Heading, Progress } from '@chakra-ui/react';

import { Seat } from '../../../lib/fetchers';

export interface SeatsProps {
  seat?: Seat;
}

export function SeatInfo({ seat }: SeatsProps): JSX.Element {
  const seatsPercent = seat === undefined ? undefined : (seat.seats.actual / seat.seats.capacity) * 100;
  const waitlistPercent =
    seat === undefined ? undefined : (seat.waitListSeats.actual / seat.waitListSeats.capacity) * 100;
  return (
    <Flex my="2" direction={{ base: 'column', md: 'row' }}>
      <Box width={{ base: '100%', md: '50%' }}>
        <Flex justifyContent="space-between" my="1">
          <Heading as="h6" size="sm">
            Seats
          </Heading>
          <Heading as="h6" size="sm">
            {seat === undefined ? '' : `${seat.seats.actual} / ${seat.seats.capacity}`}
          </Heading>
        </Flex>
        {seat !== undefined ? (
          <Progress value={seatsPercent} colorScheme={seat.seats.actual >= seat.seats.capacity ? 'red' : 'green'} />
        ) : (
          <Progress isIndeterminate />
        )}
      </Box>
      <Box width={{ base: '100%', md: '50%' }} ml={{ base: '0', md: '5' }}>
        <Flex justifyContent="space-between" my="1">
          <Heading as="h6" size="sm">
            Waitlist Seats
          </Heading>
          <Heading as="h6" size="sm">
            {seat === undefined ? '' : `${seat.waitListSeats.actual} / ${seat.waitListSeats.capacity}`}
          </Heading>
        </Flex>
        {seat !== undefined ? (
          <Progress
            value={waitlistPercent}
            colorScheme={seat.waitListSeats.actual >= seat.waitListSeats.capacity ? 'red' : 'green'}
          />
        ) : (
          <Progress isIndeterminate />
        )}
      </Box>
    </Flex>
  );
}
