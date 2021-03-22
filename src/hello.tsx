import { Flex } from '@chakra-ui/layout';

import { Header } from './app';

export function Hello(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
    </Flex>
  );
}
