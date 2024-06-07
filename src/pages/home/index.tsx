import { Center } from '@chakra-ui/react';

import Page from 'common/layouts/Page';

// const Page = dynamic(() => import('common/layouts/Page') as Promise<{ default: React.ComponentType<PageProps> }>, {
//   ssr: false,
// });

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Landing />
  );
}
