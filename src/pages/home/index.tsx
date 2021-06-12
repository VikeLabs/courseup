import { Box, Flex } from '@chakra-ui/layout';

import { Feedback } from '../../common/feedback/Feedback';
import { Header } from '../../common/header/Header';

import { Landing } from './containers/Landing';

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
