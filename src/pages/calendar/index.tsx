import { Box, Center, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Term } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import { Page } from 'common/layouts/Page';
import { Courses, CoursesTopBar } from 'common/layouts/sidebar/variants/Courses';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const smallScreen = useSmallScreen();
  const router = useRouter();
  const { term } = router.query;
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const pid = searchParams.get('pid');

  if (smallScreen)
    return (
      <Page title="Calendar" mobileSupport>
        <VStack w="100%">
          <Box w="100%" position="sticky">
            <CoursesTopBar />
          </Box>
          <Center w="100%" overflowY="auto" h="100%">
            {pid ? <Content term={term as Term} /> : <Courses term={term as Term} />}
          </Center>
        </VStack>
      </Page>
    );

  return (
    <Page title="Calendar" leftSidebar={<Courses term={term as Term} />}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </Page>
  );
}
