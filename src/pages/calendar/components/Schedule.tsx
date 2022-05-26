import { Badge, Table, Tbody, Td, Th, Thead, Tooltip, Tr, useMediaQuery, Text } from '@chakra-ui/react';

import { MeetingTimes } from 'lib/fetchers';

export interface ScheduleProps {
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
  meetingTimes: MeetingTimes[];
}

export function Schedule({ meetingTimes }: ScheduleProps): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');

  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Days</Th>
          <Th>Dates</Th>
          <Th>Time</Th>
          {/* TODO: verify if we can safely exclude this for most cases */}
          {/* <Th>Schedule Type</Th> */}
          <Th>Location</Th>
          <Th>Instructors</Th>
        </Tr>
      </Thead>
      <Tbody>
        {meetingTimes.map((m, i) => (
          <Tr key={i}>
            <Td>
              <Badge>{m.days}</Badge>
            </Td>
            <Td>{m.dateRange}</Td>
            <Td>{m.time}</Td>
            {/* TODO: verify if we can safely exclude this for most cases */}
            {/* <Td>{m.scheduleType}</Td> */}
            <Td>
              {isMobile ? (
                <Tooltip label={m.where}>
                  <Text>
                    {m.buildingAbbreviation} {m.roomNumber}
                  </Text>
                </Tooltip>
              ) : (
                m.where
              )}
            </Td>
            <Td>{m.instructors.join(', ')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
