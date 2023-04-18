import { Term } from 'lib/fetchers';
import { useTerm } from 'lib/hooks/useTerm';

import { Page } from 'common/layouts/Page';
import { Courses } from 'common/layouts/sidebar/variants/Courses';

import { SchedulerSidebar } from './components/SchedulerSidebar';
import { SchedulerContainer } from './containers/SchedulerContainer';

export function Scheduler(): JSX.Element {
  const [term] = useTerm();

  return (
    <Page
      title="Scheduler"
      leftSidebar={<Courses term={term as Term} />}
      rightSidebar={<SchedulerSidebar term={term} />}
      mobileSupport
    >
      <SchedulerContainer />
    </Page>
  );
}
