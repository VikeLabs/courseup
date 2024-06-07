import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { getCurrentTerm } from 'lib/utils/terms';

import { CustomHits } from '../components/SearchResults';
import { TopBar } from '../components/TopBar';

export function SearchResults() {
  const router = useRouter();
  const { term: routerTerm } = router.query;

  const term = typeof routerTerm === 'string' ? routerTerm : routerTerm?.[0];

  return (
    <>
      <TopBar>Search Results</TopBar>
      <Flex direction="column" overflowY="auto">
        <CustomHits term={term ?? getCurrentTerm()} />
      </Flex>
    </>
  );
}
