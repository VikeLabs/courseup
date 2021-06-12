import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion';
import { IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useClipboard } from '@chakra-ui/hooks';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useCallback, useEffect } from 'react';
import { IoCopyOutline } from 'react-icons/io5';

import { Seat } from '../../../shared/fetchers';
import { SeatInfo } from '../../calendar/components/Seats';

type Props = {
  section: string;
  crn: string;
  seats?: Seat;
  selected: boolean;
  additionalNotes?: string;
  handleChange: ({ crn, seats, selected }: { crn: string; seats?: Seat; selected: boolean }) => void;
};

export function RegistrationSection({ section, crn, seats, additionalNotes, selected, handleChange }: Props) {
  const { hasCopied, onCopy } = useClipboard(crn);
  const toast = useToast();

  useEffect(() => {
    hasCopied && toast({ status: 'info', title: `Copied ${crn} to clipboard!` });
  }, [crn, hasCopied, toast]);

  const onChange = useCallback(() => {
    handleChange({ crn, seats, selected });
  }, [crn, handleChange, seats, selected]);

  return (
    <Box py="2">
      <HStack justifyContent="space-between">
        <Heading size="md" as="h3" mt="2">
          {section}
        </Heading>
        <HStack spacing="3" top="50%" minW="205px">
          <Checkbox isChecked={selected} onChange={onChange} size="lg" h="32px">
            Registered
          </Checkbox>
          <Heading size="md" as="h3" color="gray" h="32px">
            {crn}
            <IconButton
              icon={<IoCopyOutline />}
              onClick={onCopy}
              aria-label="copy"
              colorScheme="white"
              color="black"
              mb="1"
              size="sm"
              fontSize="lg"
              _focus={{
                outline: 'none',
                color: 'rgb(19, 135, 243)',
                fontSize: '22.5px',
              }}
            />
          </Heading>
        </HStack>
      </HStack>
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
      <SeatInfo seat={seats} />
    </Box>
  );
}
