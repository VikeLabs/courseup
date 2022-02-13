import { Flex } from '@chakra-ui/react';

import { CustomHits } from '../components/SearchResults';
import { TopBar } from '../components/TopBar';

export function SearchResults() {
  return (
    <>
      <TopBar>Search Results</TopBar>
      <Flex direction="column" overflowY="auto">
        <CustomHits />
      </Flex>
    </>
  );
}
