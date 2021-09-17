import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';

export const CalendarToolBar =
  (onSelectedDateChange: (date: Date) => void) =>
  ({ label, date }: ToolbarProps) => {
    const handleClick = (offset?: number) => () => {
      if (offset) {
        const d = new Date(date);
        d.setDate(d.getDate() + offset);
        onSelectedDateChange(d);
      } else {
        onSelectedDateChange(new Date());
      }
    };
    return (
      <Flex pb="0.5em" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl">{label}</Text>
        <HStack pb="0.2em">
          <Button size="sm" colorScheme="gray" onClick={handleClick()}>
            Today
          </Button>
          <IconButton
            aria-label="Previous Week"
            colorScheme="gray"
            icon={<ChevronLeftIcon />}
            size="sm"
            onClick={handleClick(-7)}
          />
          <IconButton
            aria-label="Next Week"
            colorScheme="gray"
            icon={<ChevronRightIcon />}
            size="sm"
            onClick={handleClick(7)}
          />
        </HStack>
      </Flex>
    );
  };
