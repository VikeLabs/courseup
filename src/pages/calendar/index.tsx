import { Box, useMediaQuery, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';

import { Page } from 'common/layouts/Page';
import { Courses, CoursesTopBar } from 'common/layouts/sidebar/variants/Courses';

import { Landing } from 'pages/home/containers/Landing';

import { Content } from './containers/Content';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();
  const [isMobile] = useMediaQuery('(max-width: 1030px)');

  const pid = searchParams.get('pid');

  if (isMobile)
    return (
      <Page title="Calendar">
        <VStack w="100%">
          <Box w="100%">
            <CoursesTopBar />
          </Box>
          {pid ? <Content term={term as Term} /> : <Courses term={term as Term} />}
        </VStack>
      </Page>
    );

  return (
    <Page title="Calendar" leftSidebar={<Courses term={term as Term} />}>
      {pid ? <Content term={term as Term} /> : <Landing />}
    </Page>
  );
}
