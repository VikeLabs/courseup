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
  condition: boolean;
  color: string;
};

export function CourseBadge({ condition, color, children }: PropsWithChildren<BadgeProps>): JSX.Element {
  return (
    <>
      {condition && (
        <Badge colorScheme={color} mx="1">
          {children}
        </Badge>
      )}
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
  const isASYNC = additionalNotes?.indexOf('This course will be offered fully online and asynchronous') !== -1;
  const isBLENDED = additionalNotes?.indexOf('a mix of “real-time” and asynchronous sessions') !== -1;
  const isSENG = additionalNotes?.indexOf('Reserved for BSENG students') !== -1;
  const isCSC = additionalNotes?.indexOf('Reserved for students in a Computer Science program') !== -1;
  const isENGR = additionalNotes?.indexOf('Restricted to BEng students only') !== -1;
  const isENGRorCSC = additionalNotes?.indexOf('Restricted to students in the Faculty of Engineering') !== -1;
  const isSCI = additionalNotes?.indexOf('Restricted to SCIENCE students') !== -1;
  const isBENGorBSENG = additionalNotes?.indexOf('Restricted to BEng and BSEng students') !== -1;
  const isENGRmulti = additionalNotes?.indexOf('Reserved for BME, BSEN, CENG, ELEC students') !== -1;

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
            <CourseBadge condition={isASYNC && !isBLENDED} color="cyan">
              Asynchronous
            </CourseBadge>
            <CourseBadge condition={!isASYNC && !isBLENDED && instructionalMethod === 'online'} color="cyan">
              Synchronous
            </CourseBadge>
            <CourseBadge condition={isBLENDED} color="cyan">
              Blended
            </CourseBadge>
            <CourseBadge condition={isSENG} color="red">
              SENG ONLY
            </CourseBadge>
            <CourseBadge condition={isCSC} color="red">
              CSC ONLY
            </CourseBadge>
            <CourseBadge condition={isENGR} color="red">
              ENGR ONLY
            </CourseBadge>
            <CourseBadge condition={isENGRorCSC} color="red">
              ENGR/CSC ONLY
            </CourseBadge>
            <CourseBadge condition={isSCI} color="red">
              SCI ONLY
            </CourseBadge>
            <CourseBadge condition={isENGRmulti} color="red">
              BME/SENG/CENG/ELEC ONLY
            </CourseBadge>
            <CourseBadge condition={isBENGorBSENG} color="red">
              BENG/BSENG ONLY
            </CourseBadge>
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
