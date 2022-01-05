import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';

export const CalendarToolBar =
  (onSelectedDateChange: (date: Date) => void, vCalendar: string) =>
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
    console.log(vCalendar);

    const handleDownload = () => {
      if (vCalendar.length > 0) {
        const element = document.createElement('a');
        const file = new Blob([vCalendar], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'calendar.ics';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
      }
    };

    return (
      <Flex pb="0.5em" justifyContent="space-between" alignItems="center">
        <Heading size="md">Scheduler</Heading>
        <Text fontSize="xl">{label}</Text>
        <HStack pb="0.2em">
          <Button size="sm" colorScheme="gray" onClick={handleDownload} disabled={vCalendar === ''}>
            Download
          </Button>
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
