import { Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import { EventProps } from 'react-big-calendar';

export const CalendarEvent = ({ title, event }: EventProps) => {
  return (
    <Flex height="100%" direction="column">
      <HStack w="100%" bg="#EDF2F7" justifyContent="space-between" p="0.2em">
        <Heading size="xs">{title}</Heading>
        <Heading size="xs">{event.resource && event.resource.sectionCode}</Heading>
      </HStack>
      <VStack flex={1} justifyContent="center">
        <Heading
          color={event.resource.textColor ? event.resource.textColor : 'black'}
          justifyContent="center"
          size="sm"
        >
          {event.resource && event.resource.location}
        </Heading>
      </VStack>
    </Flex>
  );
};
