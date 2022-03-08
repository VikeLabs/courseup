import { Center, Flex, Heading } from '@chakra-ui/react';
import { useMatch } from 'react-router';

import { useCountdown } from '../hooks/useCountdown';

export function Countdown() {
  const [{ days, hours, minutes, seconds }, startCountdown] = useCountdown();

  startCountdown();

  const contest = useMatch('/contest');

  return (
    <Flex
      w="100%"
      direction={{ base: 'column', sm: 'row' }}
      textAlign={{ base: 'center', sm: 'left' }}
      color={contest ? '' : 'white'}
    >
      <Heading size="lg" mr="2">
        Submissions close in:{' '}
      </Heading>
      <Center w={{ base: '100%', sm: '220px' }}>
        <Heading as="span" size="lg" fontWeight="normal" w="100%">
          {days} : {hours < 10 ? '0' : ''}
          {hours} : {minutes < 10 ? '0' : ''}
          {minutes} : {seconds < 10 ? '0' : ''}
          {seconds}
        </Heading>
      </Center>
    </Flex>
  );
}
