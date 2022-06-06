import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
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

    const handleScreenshot = () => {
      // target the calendar container exclusively
      const calendarHTMLElement: HTMLElement = document.getElementsByClassName('rbc-time-view')[0] as HTMLElement;

      // on mobile the screenshot is of the day view
      // on desktop the screenshot is of the week view
      html2canvas(calendarHTMLElement, {
        windowHeight: isMobile ? 780 : 1080,
        windowWidth: isMobile ? 360 : 1920,
      }).then((canvas) => {
        downloadCalendarScreenshot(canvas.toDataURL(), `${term}_calendar.png`);
      });
    };

    const downloadCalendarScreenshot = (uri: string, filename: string) => {
      const downloadLink = document.createElement('a');

      if (typeof downloadLink.download === 'string') {
        downloadLink.href = uri;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        window.open(uri);
      }
    };

    return (
      <Flex pb="0.5em" justifyContent="space-between" alignItems="center">
        <Text fontSize={{ base: 'xs', sm: 'xl' }}>{label}</Text>
        <HStack pb="0.2em">
          <ShareButton term={term as Term} disabled={!vCalendar} />
          {isMobile ? (
            <>
              <IconButton
                icon={<DownloadIcon />}
                aria-label="Download timetable"
                size="sm"
                colorScheme="blue"
                onClick={handleDownload}
                disabled={!vCalendar}
              />
              <IconButton
                icon={<CalendarIcon />}
                aria-label="Download screenshot of timetable"
                size="sm"
                colorScheme="orange"
                onClick={handleScreenshot}
                disabled={!vCalendar}
              />
            </>
          ) : (
            <>
              <Button size="sm" colorScheme="blue" onClick={handleDownload} disabled={!vCalendar}>
                Download
              </Button>
              <Button size="sm" colorScheme="orange" onClick={handleScreenshot} disabled={!vCalendar}>
                Screenshot
              </Button>
            </>
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
