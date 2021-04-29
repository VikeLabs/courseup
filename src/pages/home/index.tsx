import { Container, Flex, Heading } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';

import { Header } from '../../app';

export function Home(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Helmet>
        <title>clockwork · We make school easier</title>
      </Helmet>
      <Header />
      <Container>
        <Heading>We make school easier</Heading>
      </Container>
    </Flex>
  );
}
