import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';

import { Page } from 'common/page/Page';
import { SearchableSidebar } from 'common/sidebar/containers/SearchableSidebar';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const pid = searchParams.get('pid');

  return (
    <Page title="Calendar" hasSearchableSidebar leftSidebar={<SearchableSidebar term={term as Term} searchQuery="" />}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </Page>
  );
}
