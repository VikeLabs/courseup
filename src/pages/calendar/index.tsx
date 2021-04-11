import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Header, Content, SidebarContainer, Feedback } from '../../app/index';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { Term } from '../../shared/fetchers';

export type SelectedCourse = {
  subject: string;
  code: string;
  pid: string;
  title?: string;
};

export function Calendar(): JSX.Element {
  const navigate = useNavigate();
  const { term } = useParams();

  const [query, setQuery] = useState('');

  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse>();

  useEffect(() => {
    !term && navigate(`/calendar/${getCurrentTerm()}`);
  }, [navigate, term]);

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Flex h="100vh" direction="column">
      <Header onSearchChange={handleSearchChange} />
      <Box grow={1} overflow="hidden" height="100%">
        <Flex color="white" height="100%">
          <SidebarContainer
            term={term as Term}
            onSelectedCourseChange={setSelectedCourse}
            selectedCourse={selectedCourse}
            searchQuery={query}
          />
          <Flex minW="80%" overflow="auto" justifyContent="center" height="100%" boxShadow="lg" zIndex={56}>
            {selectedCourse ? (
              <Content term={term as Term} selectedCourse={selectedCourse} />
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
        </Flex>
        <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
          <Feedback />
        </Box>
      </Box>
    </Flex>
  );
}
