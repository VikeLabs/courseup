import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { getCurrentTerm } from 'lib/utils/terms';

import { CustomHits } from '../components/SearchResults';
import { TopBar } from '../components/TopBar';

export function SearchResults() {
  const { term } = useParams();
  return (
    <>
      <TopBar>Search Results</TopBar>
      <Flex direction="column" overflowY="auto">
        <CustomHits term={term ?? getCurrentTerm()} />
      </Flex>
    </>
  );
}
