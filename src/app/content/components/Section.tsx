import { Box, Heading } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { MeetingTimes, Seat } from '../../../fetchers';
import { Schedule } from './Schedule';
import { SeatInfo } from './Seats';

export interface SectionInfoProps {
  crn: string;
  section: string;
  sectionCode: string;
  instructionalMethod: string;
  additionalNotes?: string;
  meetingTimes: MeetingTimes[];
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
  const isASYNC = additionalNotes?.indexOf('asynchronous') !== -1;
  const isSENG = additionalNotes?.indexOf('Reserved for BSENG students') !== -1;
  const isCSC = additionalNotes?.indexOf('Reserved for students in a Computer Science program') !== -1;

  const { onCopy } = useClipboard(crn);
  const toast = useToast();

  return (
    <Box as="section" bg="white" color="black" my="5">
      <Flex my="2" alignItems="center">
        <Heading mr="5" size="lg" as="h2" whiteSpace="pre">
          {sectionCode}
        </Heading>
        <Heading
          size="lg"
          as="h3"
          color="gray"
          onClick={() => {
            onCopy();
            toast({
              title: 'Course registration number copied!',
              description: `${crn} is copied to your clipboard.`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          {crn}
        </Heading>
        <Box mx="5">
          <Popover>
            <PopoverTrigger>
              <Badge colorScheme="green" mx="1">
                {instructionalMethod}
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>This means this section takes place online.</PopoverBody>
            </PopoverContent>
          </Popover>
          {isASYNC && (
            <Badge colorScheme="cyan" mx="1">
              Asynchronous
            </Badge>
          )}
          {isSENG && (
            <Badge colorScheme="orange" mx="1">
              SENG ONLY
            </Badge>
          )}
          {isCSC && (
            <Badge colorScheme="yellow" mx="1">
              CSC ONLY
            </Badge>
          )}
        </Box>
      </Flex>
      <Box>
        {additionalNotes && (
          <Accordion allowToggle my="3">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Addtional Notes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{additionalNotes}</AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        <Schedule meetingTimes={meetingTimes}/>
        {seat && (
          <Box my="5">
            <SeatInfo seat={seat} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
