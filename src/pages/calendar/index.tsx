import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Header, Content, Feedback } from '../../app/index';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { ContentSidebar } from '../../app/sidebar';
import { Term } from '../../shared/fetchers';

export type SelectedCourse = {
  title?: string;
};

export function Calendar(): JSX.Element {
  const navigate = useNavigate();
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const sessionTerm = sessionStorage.getItem('meta:term');
    const currentTerm = getCurrentTerm();
    if (term) {
      sessionStorage.setItem('meta:term', term);
      navigate(`/calendar/${term}`);
    } else if (sessionTerm) {
      navigate(`/calendar/${sessionTerm}`);
    } else {
      sessionStorage.setItem('meta:term', currentTerm);
      navigate(`/calendar/${currentTerm}`);
    }
  }, [navigate, term]);

  const pid = searchParams.get('pid');

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Flex h="100vh" direction="column">
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term as Term} searchQuery={query} />
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {pid && <Content term={term as Term} />}
          {!pid && (
            <Center p="10">
              <VStack>
                <Heading color="black">Explore Courses</Heading>
                <Text color="gray">
                  Select a subject and then a course to start viewing course details and section information.
                </Text>
              </VStack>
            </Center>
          )}
        </Flex>
        <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
          <Feedback />
        </Box>
      </Flex>
    </Flex>
  );
}
