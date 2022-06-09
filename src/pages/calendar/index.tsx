import { Box, Center, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import { Page } from 'common/layouts/Page';
import { Courses, CoursesTopBar } from 'common/layouts/sidebar/variants/Courses';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();
  const smallScreen = useSmallScreen();

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
