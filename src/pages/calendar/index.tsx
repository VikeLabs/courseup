import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';

import { Page } from 'common/page/Page';
import { Courses } from 'common/sidebar/variants/Courses';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const pid = searchParams.get('pid');

  return (
    <Page title="Calendar" leftSidebar={<Courses term={term as Term} />}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </Page>
  );
}
