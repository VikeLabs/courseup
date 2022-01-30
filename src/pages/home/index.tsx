import { Center } from '@chakra-ui/react';

import { Page } from 'common/page';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Page>
      <Center h="100%" overflow="auto">
        <Landing />
      </Center>
    </Page>
  );
}
