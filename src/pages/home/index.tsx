import { Container, Flex, Heading } from '@chakra-ui/layout';

import { Header } from '../../app';

export function Home(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Container>
        <Heading>We make school easier</Heading>
      </Container>
    </Flex>
  );
}
