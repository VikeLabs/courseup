import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, HStack, IconButton, Text, Icon } from '@chakra-ui/react';
import { ToolbarProps } from 'react-big-calendar';
import { IoShareOutline } from 'react-icons/io5';

import { SavedCourse } from 'lib/hooks/useSavedCourses';

import ShareTimetableModal from './share/ShareTimetableModal';

export const CalendarToolBar =
  (
    onSelectedDateChange: (date: Date) => void,
    isOpen: any,
    onClose: any,
    onOpen: any,
    term: string,
    courses: SavedCourse[]
  ) =>
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

    const inSession_savedCourses = courses
      .filter((course) => course.term === term)
      .filter((course) => course.lecture || course.lab || course.tutorial);
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
        <Button
          isDisabled={inSession_savedCourses.length > 0 ? false : true}
          size="sm"
          colorScheme="blue"
          leftIcon={<Icon as={IoShareOutline} />}
          onClick={onOpen}
        >
          Share
        </Button>
        <ShareTimetableModal onClose={onClose} isOpen={isOpen} inSession_savedCourses={inSession_savedCourses} />
      </Flex>
    );
  };
