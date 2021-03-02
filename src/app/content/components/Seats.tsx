import { Box, Flex, Heading, Progress } from '@chakra-ui/react';
import { Seat } from '../../../fetchers';

export interface SeatsProps {
  seat: Seat;
}

export function SeatInfo({ seat: { seats, waitListSeats, requirements } }: SeatsProps): JSX.Element {
  const seatsPercent = (seats.actual / seats.capacity) * 100;
  const waitlistPercent = (waitListSeats.actual / waitListSeats.capacity) * 100;
  return (
    <Flex my="2" direction={{ base: 'column', md: 'row' }}>
      <Box width={{ base: '100%', md: '50%' }}>
        <Flex justifyContent="space-between" my="1">
          <Heading as="h6" size="sm">
            Seats
          </Heading>
          <Heading as="h6" size="sm">
            {`${seats.actual} / ${seats.capacity}`}
          </Heading>
        </Flex>
        <Progress value={seatsPercent} colorScheme={seats.actual >= seats.capacity ? 'red' : 'green'} />
      </Box>
      <Box width={{ base: '100%', md: '50%' }} ml={{ base: '0', md: '5' }}>
        <Flex justifyContent="space-between" my="1">
          <Heading as="h6" size="sm">
            Waitlist Seats
          </Heading>
          <Heading as="h6" size="sm">
            {`${waitListSeats.actual} / ${waitListSeats.capacity}`}
          </Heading>
        </Flex>
        <Progress value={waitlistPercent} colorScheme={seats.actual >= seats.capacity ? 'red' : 'green'} />
      </Box>
    </Flex>
  );
}
