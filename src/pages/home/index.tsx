import { Flex } from '@chakra-ui/layout';

import { Header } from 'common/header';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Landing />
    </Flex>
  );
}
