import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';

import { Page } from 'common/layouts/Page';
import { Courses } from 'common/layouts/sidebar/variants/Courses';

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
      <SchedulerContainer />
    </Page>
  );
}
