import { Image } from '@chakra-ui/image';
import { Button, Center, VStack } from '@chakra-ui/react';
import { BsPalette } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Countdown } from 'pages/contest/components/Countdown';

export function Landing() {
  return (
    <Center p="5">
      <VStack h="100%" w="100%">
        <Image
          alt="logo contest graphic"
          src={process.env.PUBLIC_URL + '/assets/contest/logo_design_contest.svg'}
          maxH="400px"
          userSelect="none"
        />
        <Countdown />
        <Button as={Link} to="/contest" colorScheme="pink" rightIcon={<BsPalette />} size="lg">
          Click me for more details!
        </Button>
      </VStack>
    </Center>
  );
}
