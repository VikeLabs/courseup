import { Flex } from '@chakra-ui/react';

import { useTerm } from 'lib/hooks/useTerm';

import { CustomHits } from '../components/SearchResults';
import { TopBar } from '../components/TopBar';

export function SearchResults() {
  const [term] = useTerm();

  return (
    <>
      <TopBar>Search Results</TopBar>
      <Flex direction="column" overflowY="auto">
        <CustomHits term={term} />
      </Flex>
    </>
  );
}
