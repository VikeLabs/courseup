import { PropsWithChildren } from 'react';

import { Box, Heading, Text } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { useParams } from 'react-router';

import { MeetingTimes, Seat } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';

import { Schedule } from './Schedule';
import { SeatInfo } from './Seats';

type BadgeProps = {
  name: string;
  color: string;
};

export function CourseBadge({ color, children }: PropsWithChildren<BadgeProps>): JSX.Element {
  return (
    <>
      {
        <Badge colorScheme={color} mx="1">
          {children}
        </Badge>
      }
    </>
  );
}

export interface SectionInfoProps {
  /**
   * course registration number
   */
  crn: string;
  /**
   * section type
   * example: one of lecture, lab, tutorial
   */
  section: string;
  /**
   * section code
   * example: A01, B01, T01 etc.
   */
  sectionCode: string;
  /**
   * instructional method of the section
   * example: face-to-face, online etc.
   */
  instructionalMethod: string;
  /**
   * addtional notes
   */
  additionalNotes?: string;
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
  meetingTimes: MeetingTimes[];
  /**
   * current capacity of a section, waitlist and current enrollment numbers.
   */
  seat?: Seat;
}

export function SectionInfo({
  crn,
  sectionCode,
  instructionalMethod,
  additionalNotes,
  seat,
  meetingTimes,
}: SectionInfoProps): JSX.Element {
  const badges: BadgeProps[] = [];

  // Special cases for async/sync/blended because UVic notes are funky
  if (instructionalMethod === 'online') {
    if (additionalNotes?.indexOf('mix of “real-time” and asynchronous') !== -1) {
      badges.push({
        name: 'Blended',
        color: 'cyan',
      });
    } else if (additionalNotes?.indexOf('fully online and asynchronous') !== -1) {
      badges.push({
        name: 'Asynchronous',
        color: 'cyan',
      });
    } else {
      badges.push({
        name: 'Synchronous',
        color: 'cyan',
      });
    }
  }

  const rules: string[] = [
    'Reserved for BSENG students',
    'Computer Science program.',
    'BEng students',
    'Faculty of Engineering',
    'SCIENCE students',
    'BEng and BSEng students',
    'BME, BSEN, CENG, ELEC students',
  ];

  const names: string[] = [
    'SENG Only',
    'CSC Only',
    'ENGR Only',
    'ENGR/CSC Only',
    'SCI Only',
    'BENG or BSENG only',
    'BME/SENG/CENG/ELEC ONLY',
  ];

  for (let i = 0; i < rules.length; i++) {
    if (additionalNotes?.indexOf(rules[i]) !== -1) {
      badges.push({
        name: names[i],
        color: 'red',
      });
    }
  }

  const { term } = useParams();
  const mode = useDarkMode();

  return (
    <Box as="section" my="4" boxShadow="md" p="3" rounded="lg" bgColor={mode('white', 'dark.backrgound')}>
      <Flex my="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Heading size="lg" as="h2" whiteSpace="pre" id={sectionCode}>
            {sectionCode}
          </Heading>
          <Box mx="5">
            <Badge colorScheme="green" mx="1">
              {instructionalMethod}
            </Badge>
            {badges.map((b) => (
              <CourseBadge name={b.name} color={b.color}>
                {b.name}
              </CourseBadge>
            ))}
          </Box>
        </Flex>
        <Heading size="md" as="h3" color={mode('gray', 'dark.header')}>
          {crn}
        </Heading>
      </Flex>
      <Box>
        {additionalNotes && (
          <Accordion allowToggle my="3">
            <AccordionItem>
              <Heading as="h2">
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Addtional Notes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>{additionalNotes}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        <Schedule meetingTimes={meetingTimes} />
        <Box my="5">
          <SeatInfo seat={seat} />
        </Box>
      </Box>
      <Text as="span" fontWeight="bold" fontSize={12} align="right" w="100%" display="block">
        Source:
        <Text as="span" color="blue.500" fontWeight="light">
          <Text
            as="a"
            href={`https://www.uvic.ca/BAN1P/bwckschd.p_disp_detail_sched?term_in=${term}&crn_in=${crn}`}
            target="_blank"
            _hover={{ color: 'blue' }}
            ml="1"
          >
            UVic
          </Text>
        </Text>
      </Text>
    </Box>
  );
}
