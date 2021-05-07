import { Text, Box, Stack, Radio, RadioGroup, HStack } from '@chakra-ui/react';
import React from 'react';

import { ClassScheduleListing, MeetingTimes } from '../../../shared/fetchers';

export function Sectionss({ sections }: { sections: ClassScheduleListing[] }): JSX.Element {
  const [section, setSection] = React.useState('0');

  return (
    <RadioGroup onChange={setSection} value={section}>
      <Stack>
        {sections.map(({ sectionCode, meetingTimes }, index) => (
          <Option radioValue={index.toString()} sectionCode={sectionCode} meetingTimes={meetingTimes} />
        ))}
      </Stack>
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
  /**
   * value for radio group from index
   * example: '0', '1' etc.
   */
  radioValue: string;
}

export function Option({ meetingTimes, sectionCode, radioValue }: OptionsProps): JSX.Element {
  return (
    <Box>
      {meetingTimes.map((m) => (
        <Radio value={radioValue}>
          <HStack>
            <Text fontWeight="bold"> {sectionCode} </Text>
            <Text>
              {m.days} {m.time} {m.where}
            </Text>
          </HStack>
        </Radio>
      ))}
    </Box>
  );
}
