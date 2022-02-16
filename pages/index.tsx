import { Center } from '@chakra-ui/react';

import { Landing } from '../src/pages/home/containers/Landing';

function HomePage() {
  return (
    <Center h="100vh" overflow="auto">
      <Landing />
    </Center>
  );
}

export default HomePage;
