import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Header, Content as CourseContent, SidebarContainer, Feedback } from '../../app/index';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { Term } from '../../shared/fetchers';

export type SelectedCourse = {
  title?: string;
};

export function Calendar(): JSX.Element {
  const navigate = useNavigate();
  const { term, subject, code } = useParams();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState('');

  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse>();

  useEffect(() => {
    !term && navigate(`/calendar/${getCurrentTerm()}`);
  }, [navigate, term, subject, code, setSelectedCourse, searchParams]);

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Flex h="100vh" direction="column">
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden" height="100%">
        <SidebarContainer
          term={term as Term}
          onSelectedCourseChange={setSelectedCourse}
          selectedCourse={selectedCourse}
          searchQuery={query}
        />
        <Flex minW="80%" overflow="auto" justifyContent="center" height="100%" boxShadow="lg" zIndex={56}>
          {searchParams.get('pid') ? (
            <CourseContent term={term as Term} />
          ) : (
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
