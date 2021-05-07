import { Radio, RadioGroup, Thead, Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React from 'react';

import { ClassScheduleListing, MeetingTimes } from '../../../shared/fetchers';

export function Sectionss({ sections }: { sections: ClassScheduleListing[] }): JSX.Element {
  const [section, setSection] = React.useState('');
  console.log(section);
  return (
    <RadioGroup onChange={setSection} value={section}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Option</Th>
            <Th>Section</Th>
            <Th>Days</Th>
            <Th>Times</Th>
            <Th>Location</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sections.map(({ sectionCode, meetingTimes }) => (
            <Option sectionCode={sectionCode} meetingTimes={meetingTimes} />
          ))}
        </Tbody>
      </Table>
    </RadioGroup>
  );
}

export interface OptionsProps {
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
  meetingTimes: MeetingTimes[];
  /**
   * section code
   * example: A01, B01, T01 etc.
   */
  sectionCode: string;
}

export function Option({ meetingTimes, sectionCode }: OptionsProps): JSX.Element {
  return (
    <>
      {meetingTimes.map((m) => (
        <Tr>
          <Td>
            <Radio value={sectionCode} />
          </Td>
          <Td fontWeight="bold"> {sectionCode} </Td>
          <Td>{m.days}</Td>
          <Td>{m.time}</Td>
          <Td>{m.where}</Td>
        </Tr>
      ))}
    </>
  );
}
