import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import { MeetingTimes } from '../../../fetchers';

export interface ScheduleProps {
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
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
          {/* TODO: verify if we can safely exclude this for most cases */}
          {/* <Th>Schedule Type</Th> */}
          <Th>Location</Th>
          <Th>Instructors</Th>
        </Tr>
      </Thead>
      <Tbody>
        {meetingTimes.map((m, i) => (
          <Tr key={i}>
            <Td>{m.days}</Td>
            <Td>{m.dateRange}</Td>
            <Td>{m.time}</Td>
            {/* TODO: verify if we can safely exclude this for most cases */}
            {/* <Td>{m.scheduleType}</Td> */}
            <Td>{m.where}</Td>
            <Td>{m.instructors.join(', ')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
