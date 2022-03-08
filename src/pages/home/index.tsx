import { Center } from '@chakra-ui/react';

import { Page } from 'common/layouts/Page';

import { Landing } from './containers/Landing';

export function Home(): JSX.Element {
  return (
    <Page mobileSupport>
      <Center h="100%" w="100%" bgImg={process.env.PUBLIC_URL + '/assets/contest/background.svg'} bgSize="cover">
        <Landing />
      </Center>
    </Page>
  );
}
