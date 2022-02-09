import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';

import { SidebarTemplate } from 'common/sidebar/';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const pid = searchParams.get('pid');

  return (
    <SidebarTemplate title="Calendar" term={term as Term}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </SidebarTemplate>
  );
}
