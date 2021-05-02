import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Header, Content, Feedback } from '../../app/index';
import Landing from '../../app/landing';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { ContentSidebar } from '../../app/sidebar';
import { Term } from '../../shared/fetchers';
import { useSessionStorage } from '../../shared/useStorage';

export function Calendar(): JSX.Element {
  const navigate = useNavigate();
  const { term } = useParams();
  const [searchParams] = useSearchParams();
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else {
      navigate(`/calendar/${savedTerm}`, { replace: true });
    }
  }, [navigate, term, savedTerm, setSavedTerm]);

  const pid = searchParams.get('pid');

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Flex h="100vh" direction="column">
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term as Term} searchQuery={query} />
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {pid ? <Content term={term as Term} /> : <Landing />}
        </Flex>
        <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
          <Feedback />
        </Box>
      </Flex>
    </Flex>
  );
}
