import React from 'react';
import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { MeetingTimes } from '../../../fetchers';

export interface ScheduleProps {
  meetingTimes: MeetingTimes[];
}

export function Schedule({ meetingTimes }: ScheduleProps): JSX.Element {
  return (
    <Table variant="striped" size="sm">
      <Thead>
        <Tr>
          <Th>Days</Th>
          <Th>Dates</Th>
          <Th>Time</Th>
          {/* <Th>Schedule Type</Th> */}
          <Th>Location</Th>
          <Th>Instructors</Th>
        </Tr>
      </Thead>
      <Tbody>
        {meetingTimes.map((m) => (
          <Tr>
            <Td>
              <Badge>{m.days}</Badge>
            </Td>
            <Td>{m.dateRange}</Td>
            <Td>{m.time}</Td>
            {/* <Td>{m.scheduleType}</Td> */}
            <Td>{m.where}</Td>
            <Td>{m.instructors.join(', ')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
