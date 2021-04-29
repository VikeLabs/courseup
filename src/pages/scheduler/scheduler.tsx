import { Flex } from '@chakra-ui/layout';

import { Header, SchedulerContainer } from '../../app';

export function Scheduler(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <SchedulerContainer />
    </Flex>
  );
}
