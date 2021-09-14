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
            {isASYNC && (
              <Badge colorScheme="cyan" mx="1">
                Asynchronous
              </Badge>
            )}
            {!isASYNC && !isBLENDED && instructionalMethod === 'online' && (
              <Badge colorScheme="cyan" mx="1">
                Synchronous
              </Badge>
            )}
            {isBLENDED && (
              <Badge colorScheme="cyan" mx="1">
                Blended
              </Badge>
            )}
            {isSENG && (
              <Badge colorScheme="red" mx="1">
                SENG ONLY
              </Badge>
            )}
            {isCSC && (
              <Badge colorScheme="red" mx="1">
                CSC ONLY
              </Badge>
            )}
            {isENGR && (
              <Badge colorScheme="red" mx="1">
                ENGR ONLY
              </Badge>
            )}
            {isENGRorCSC && (
              <Badge colorScheme="red" mx="1">
                ENGR/CSC ONLY
              </Badge>
            )}
            {isSCI && (
              <Badge colorScheme="red" mx="1">
                SCI ONLY
              </Badge>
            )}
            {isENGRmulti && (
              <Badge colorScheme="red" mx="1">
                BME/SENG/CENG/ELEC ONLY
              </Badge>
            )}
            {isBENGorBSENG && (
              <Badge colorScheme="red" mx="1">
                BENG/BSENG ONLY
              </Badge>
            )}
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
