import { Box, Flex } from '@chakra-ui/layout';

import { Feedback, Header } from '../../app';
import Landing from '../../app/landing';

export function Home(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Landing />
      <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
        <Feedback />
      </Box>
    </Flex>
  );
}
