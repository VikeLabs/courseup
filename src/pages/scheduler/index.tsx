import { useRouter } from 'next/router';

import { Term } from 'lib/fetchers';

import Page from 'common/layouts/Page';
import { Courses } from 'common/layouts/sidebar/variants/Courses';

import { SchedulerSidebar } from './components/SchedulerSidebar';
import { SchedulerContainer } from './containers/SchedulerContainer';

export function Scheduler(): JSX.Element {
  const router = useRouter();
  const term = router.query.term as Term;

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
