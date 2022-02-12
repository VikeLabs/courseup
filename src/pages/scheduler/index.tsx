import { Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';

import { Page } from 'common/page/Page';
import { Courses } from 'common/sidebar/variants/Courses';

import { SchedulerSidebar } from './components/SchedulerSidebar';
import { SchedulerContainer } from './containers/SchedulerContainer';

export function Scheduler(): JSX.Element {
  const { term } = useParams();

  return (
    <Page
      title="Scheduler"
      leftSidebar={<Courses term={term as Term} />}
      rightSidebar={<SchedulerSidebar term={term} />}
    >
      <Flex flexGrow={1}>
        <SchedulerContainer />
      </Flex>
    </Page>
  );
}
