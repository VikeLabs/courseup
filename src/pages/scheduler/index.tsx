import { Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';

import { Page } from 'common/page/Page';
import { SearchableSidebar } from 'common/sidebar/containers/SearchableSidebar';

import { SchedulerSidebar } from './components/SchedulerSidebar';
import { SchedulerContainer } from './containers/SchedulerContainer';

export function Scheduler(): JSX.Element {
  const { term } = useParams();

  return (
    <Page
      title="Scheduler"
      hasSearchableSidebar
      leftSidebar={<SearchableSidebar term={term as Term} searchQuery="" />}
      rightSidebar={<SchedulerSidebar term={term} />}
    >
      <Flex flexGrow={1}>
        <SchedulerContainer />
      </Flex>
    </Page>
  );
}
