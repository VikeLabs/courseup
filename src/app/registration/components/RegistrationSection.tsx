import { Checkbox } from '@chakra-ui/checkbox';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { useCallback } from 'react';

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
  const onChange = useCallback(() => {
    handleChange({ crn, seats, selected });
  }, [crn, handleChange, seats, selected]);

  return (
    <Box py="2">
      <HStack justifyContent="space-between">
        <Heading size="md" as="h3" mt="2">
          {section}{' '}
          <Text as="span" fontWeight="normal" ml="2" color="rgb(155, 155, 155)">
            {crn}
          </Text>
        </Heading>
        <Checkbox isChecked={selected} onChange={onChange}>
          Registered
        </Checkbox>
      </HStack>
      <SeatInfo seat={seats} />
    </Box>
  );
}
