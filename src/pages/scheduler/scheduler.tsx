import { Flex, Heading } from '@chakra-ui/layout';

import { Header } from '../../app';

export function Scheduler(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Heading>Schedule Builder</Heading>
    </Flex>
  );
}
