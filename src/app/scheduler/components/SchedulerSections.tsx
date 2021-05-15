import { Radio, RadioGroup, Thead, Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React from 'react';

import { ClassScheduleListing, MeetingTimes } from '../../../shared/fetchers';

export function SectionsCardContainer({ sections }: { sections: ClassScheduleListing[] }): JSX.Element {
  const sectionTypes = sections.map((s) => s.sectionType).filter((item, pos, self) => self.indexOf(item) === pos);

  return (
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
        {sectionTypes.map((type) => (
          <SectionGroup sections={sections} type={type} />
        ))}
      </Tbody>
    </Table>
  );
}

export interface SectionGroupProps {
  /**
   * Array of sections of a course
   */
  sections: ClassScheduleListing[];
  /**
   * type of section
   * example: Lecture, Tutorial, Lab etc.
   */
  type: string;
}

export function SectionGroup({ sections, type }: SectionGroupProps): JSX.Element {
  const [section, setSection] = React.useState('');

  return (
    <RadioGroup onChange={setSection} value={section} name={type}>
      {sections
        .filter((s) => s.sectionType === type)
        .map(({ sectionCode, meetingTimes }) => (
          <Option sectionCode={sectionCode} meetingTimes={meetingTimes} />
        ))}
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
