import { Center } from '@chakra-ui/react';

import { Page } from 'common/layouts/Page';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Page>
      <Center h="100vh" overflow="auto">
        <Landing />
      </Center>
    </Page>
  );
}
