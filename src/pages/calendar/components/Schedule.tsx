import { Badge, Box, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { MeetingTimes } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import Location from 'common/location/Location';

import { Instructor } from './Instructor';

export interface ScheduleProps {
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
  meetingTimes: MeetingTimes[];
}

function MobileSchedule({ meetingTimes }: ScheduleProps): JSX.Element {
  return (
    <Box overflowX="auto" textAlign="left">
      <Table variant="striped" size="sm" w="100%">
        <Tr maxW="100px">
          <Th scope="row" pl={2}>
            Days
          </Th>
          {meetingTimes.map((m, i) => (
            <Td key={i}>
              <Badge>{m.days}</Badge>
            </Td>
          ))}
        </Tr>
        <Tr>
          <Th scope="row" pl={2}>
            Dates
          </Th>
          {meetingTimes.map((m, i) => (
            <Td key={i}>{m.dateRange}</Td>
          ))}
        </Tr>
        <Tr>
          <Th scope="row" pl={2}>
            Time
          </Th>
          {meetingTimes.map((m, i) => (
            <Td key={i}>{m.time}</Td>
          ))}
        </Tr>
        <Tr>
          <Th scope="row" pl={2}>
            Location
          </Th>
          {meetingTimes.map((m, i) => (
            <Td key={i}>{m.where}</Td>
          ))}
        </Tr>
        <Tr>
          <Th scope="row" pl={2}>
            Instructors
          </Th>
          {meetingTimes.map(
            (m, i) =>
              m.instructors.length > 0 && (
                <Td>
                  <HStack>
                    {m.instructors.map((instructor) => (
                      <Instructor key={i} name={instructor} />
                    ))}
                  </HStack>
                </Td>
              )
          )}
        </Tr>
      </Table>
    </Box>
  );
}

export function Schedule({ meetingTimes }: ScheduleProps): JSX.Element {
  const smallScreen = useSmallScreen();

  const professor = meetingTimes.map((m) => m.instructors)[0];

  if (smallScreen) return <MobileSchedule meetingTimes={meetingTimes} />;
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
          {professor.length > 0 && <Th>Instructors</Th>}
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
              <Location short={`${m.buildingAbbreviation} ${m.roomNumber}`} long={m.where} />
            </Td>
            {m.instructors.length > 0 && (
              <Td>
                {m.instructors.map((instructor) => (
                  <Instructor name={instructor} />
                ))}
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
