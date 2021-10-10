import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, HStack, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { ToolbarProps } from 'react-big-calendar';
import { useParams } from 'react-router';
import ShareTimetableModal from './share/ShareTimetableModal';

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

    const { term } = useParams();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { courses } = useSavedCourses();
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
        <Text fontSize="xl">{label}</Text>
        <Button
          isDisabled={inSession_savedCourses.length > 0 ? false : true}
          size="sm"
          colorScheme="blue"
          onClick={onOpen}
        >
          Share
        </Button>
        <ShareTimetableModal onClose={onClose} isOpen={isOpen} inSession_savedCourses={inSession_savedCourses} />
      </Flex>
    );
  };
