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

/*
 * Course info and course tag pairs
 *
 * Additional info on courses are listed here alongside
 * the coorisponding badge that is associated with it.
 *
 * For example, SENG265 has a section that says 'Reserved for
 * BSENG students', so we want to display a 'SENG Only' badge
 */

const courseTags = {
  'Reserved for BSENG students': 'SENG Only',
  'Computer Science program.': 'CSC Only',
  'BEng students': 'ENGR Only',
  'Faculty of Engineering': 'ENGR/CSC Only',
  'SCIENCE students': 'SCI only',
  'BEng and BSEng students': 'BEng/BSeng Only',
  'BME, BSEN, CENG, ELEC students': 'BME/SENG/CENG/ELEC Only',
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

  /* Special cases for async/sync/blended
   * The UVic notes are not normalized, giving
   * us inconsistent things to look out for.
   */
  if (additionalNotes?.indexOf('fully online and asynchronous') !== -1) {
    badges.push({
      name: 'Asynchronous',
      color: 'cyan',
    });
  }
  if (additionalNotes?.indexOf('fully online and synchronous') !== -1) {
    badges.push({
      name: 'Synchronous',
      color: 'cyan',
    });
  }
  if (additionalNotes?.indexOf('mix of “real-time” and asynchronous') !== -1) {
    badges.push({
      name: 'Blended',
      color: 'cyan',
    });
  }

  for (const [key, value] of Object.entries(courseTags)) {
    if (additionalNotes?.indexOf(key) !== -1) {
      badges.push({
        name: value,
        color: 'red',
      });
    }
  }

  const { term } = useParams();
  const mode = useDarkMode();

  return (
    <Box
      as="section"
      mb={{ base: 3, md: 4 }}
      boxShadow="md"
      p={{ base: 0, md: 3 }}
      py={3}
      rounded={{ base: 'none', md: 'lg' }}
      bgColor={mode('white', 'dark.background')}
    >
      <Flex my="2" alignItems="center" justifyContent="space-between" px={{ base: 2, md: 0 }}>
        <Flex alignItems="center">
          <Heading size="lg" as="h2" whiteSpace="pre" id={sectionCode}>
            {sectionCode}
          </Heading>
          <Box mx="5">
            <Badge colorScheme="green" mx="1">
              {instructionalMethod}
            </Badge>
            {badges.map((badges, name) => (
              <CourseBadge key={name} name={badges.name} color={badges.color}>
                {badges.name}
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
                <AccordionButton p={2}>
                  <Box flex="1" textAlign="left">
                    Additional Notes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} px={2}>
                {additionalNotes}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        <Schedule meetingTimes={meetingTimes} />
        <Box my="5" px={{ base: 2, md: 0 }}>
          <SeatInfo seat={seat} />
        </Box>
      </Box>
      <Text as="span" fontWeight="bold" fontSize={12} align="right" w="100%" display="block" pr={2}>
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
