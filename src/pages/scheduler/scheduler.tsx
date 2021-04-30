import { Flex, Heading } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';

import { Header } from '../../app';

export function Scheduler(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Helmet>
        <title>Schedule Courses</title>
      </Helmet>
      <Header />
      <Heading>Schedule Builder</Heading>
    </Flex>
  );
}
