import { Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import { EventProps as BaseEventProps } from 'react-big-calendar';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { CourseCalendarEvent } from 'pages/scheduler/shared/types';

export type EventProps = BaseEventProps<{ resource: Omit<CourseCalendarEvent, 'meetingTime' | 'term'> }>;

export const CalendarEvent = ({ title, event: { resource } }: EventProps) => {
  const mode = useDarkMode();
  return (
    <Flex height="100%" direction="column">
      <HStack
        w="100%"
        bg={mode('gray.100', 'dark.main')}
        justifyContent="space-between"
        p="0.2em"
        color={mode('dark.main', 'white')}
      >
        <Heading size="xs">{title}</Heading>
        <Heading size="xs">{resource && resource.sectionCode}</Heading>
      </HStack>
      <VStack flex={1} justifyContent="center">
        <Heading color={resource.textColor ? resource.textColor : 'black'} justifyContent="center" size="sm">
          {resource && resource.location}
        </Heading>
      </VStack>
    </Flex>
  );
};
