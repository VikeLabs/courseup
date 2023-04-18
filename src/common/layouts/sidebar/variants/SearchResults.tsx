import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useSavedTerm } from 'lib/hooks/useSavedTerm';

import { CustomHits } from '../components/SearchResults';
import { TopBar } from '../components/TopBar';

export function SearchResults() {
  const { term } = useParams();
  const [currentTerm] = useSavedTerm();

  return (
    <>
      <TopBar>Search Results</TopBar>
      <Flex direction="column" overflowY="auto">
        <CustomHits term={term ?? currentTerm} />
      </Flex>
    </>
  );
}
