import { IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useClipboard } from '@chakra-ui/hooks';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useCallback, useEffect } from 'react';
import { IoCopyOutline } from 'react-icons/io5';

import { Seat } from '../../../shared/fetchers';
import { SeatInfo } from '../../content/components/Seats';

type Props = {
  section: string;
  crn: string;
  seats?: Seat;
  selected: boolean;
  handleChange: ({ crn, seats, selected }: { crn: string; seats?: Seat; selected: boolean }) => void;
};

export function RegistrationSection({ section, crn, seats, selected, handleChange }: Props) {
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
        <HStack spacing="3">
          <Checkbox isChecked={selected} onChange={onChange}>
            Registered
          </Checkbox>
          <Heading size="md" as="h3" color="gray">
            {crn}
            <IconButton
              icon={<IoCopyOutline />}
              onClick={onCopy}
              aria-label="copy"
              colorScheme="white"
              color="black"
              size="lg"
              ml="-2.5"
              _focus={{
                outline: 'none',
              }}
              _active={{
                color: 'rgb(155, 155, 155)',
              }}
            />
          </Heading>
        </HStack>
      </HStack>
      <SeatInfo seat={seats} />
    </Box>
  );
}
