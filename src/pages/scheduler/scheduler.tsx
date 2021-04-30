import { Flex } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';

import { Header, SchedulerContainer } from '../../app';

export function Scheduler(): JSX.Element {
  return (
    <Flex h="100vh" direction="column">
      <Helmet>
        <title>Schedule Courses</title>
      </Helmet>
      <Header />
      <SchedulerContainer />
    </Flex>
  );
}
