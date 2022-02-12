import { Center } from '@chakra-ui/react';

import { Page } from 'common/page/Page';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Page>
      <Center overflow="auto">
        <Landing />
      </Center>
    </Page>
  );
}
