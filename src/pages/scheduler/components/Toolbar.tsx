import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';

import { Term } from 'lib/fetchers';
import { logEvent } from 'lib/utils/logEvent';

import { ShareButton } from './share/ShareButton';

export const CalendarToolBar =
  (onSelectedDateChange: (date: Date) => void, term: string, isMobile: boolean, vCalendar?: string) =>
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

    const handleDownload = () => {
      if (vCalendar) {
        logEvent('calendar_download', { term });

        const element = document.createElement('a');
        const file = new Blob([vCalendar], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${term}_calendar.ics`;
        element.click();
        document.body.removeChild(element);
      }
    };

    return (
      <Flex pb="0.5em" justifyContent="space-between" alignItems="center">
        <Text fontSize={{ base: 'xs', sm: 'xl' }}>{label}</Text>
        <HStack pb="0.2em">
          <ShareButton term={term as Term} disabled={!vCalendar} />
          {isMobile ? (
            <IconButton
              icon={<DownloadIcon />}
              aria-label="Download timetable"
              size="sm"
              colorScheme="blue"
              onClick={handleDownload}
              disabled={!vCalendar}
            />
          ) : (
            <Button size="sm" colorScheme="blue" onClick={handleDownload} disabled={!vCalendar}>
              Download
            </Button>
          )}
          <Button size="sm" colorScheme="gray" onClick={handleClick()}>
            Today
          </Button>
          <IconButton
            aria-label="Previous Week"
            colorScheme="gray"
            icon={<ChevronLeftIcon />}
            size="sm"
            onClick={handleClick(isMobile ? -1 : -7)}
          />
          <IconButton
            aria-label="Next Week"
            colorScheme="gray"
            icon={<ChevronRightIcon />}
            size="sm"
            onClick={handleClick(isMobile ? 1 : 7)}
          />
        </HStack>
      </Flex>
    );
  };
