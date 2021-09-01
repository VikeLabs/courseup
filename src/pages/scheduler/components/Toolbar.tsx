import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';

export const CustomToolBar =
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
        <Heading size="md">Scheduler</Heading>
        <Text fontSize="xl">{label}</Text>
        <HStack pb="0.2em">
          <Button size="sm" colorScheme="gray" onClick={handleClick()}>
            Today
          </Button>
          <IconButton
            aria-label="Previous Week"
            bg="gray"
            icon={<ChevronLeftIcon color="white" />}
            size="sm"
            onClick={handleClick(-7)}
          />
          <IconButton
            aria-label="Next Week"
            bg="gray"
            icon={<ChevronRightIcon color="white" />}
            size="sm"
            onClick={handleClick(7)}
          />
        </HStack>
      </Flex>
    );
  };
