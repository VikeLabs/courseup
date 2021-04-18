import { Center, Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { SelectedCourse } from '../../../pages/calendar';
import { Term, useGetCourses, useSubjects } from '../../../shared/fetchers';
import { CustomHits } from '../components/SearchResults';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';

export interface SidebarContainerProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;

  searchQuery: string;
  selectedCourse?: SelectedCourse;
  onSelectedCourseChange: (selectedCourse?: SelectedCourse) => void;
}

export function SidebarContainer({
  selectedCourse,
  onSelectedCourseChange,
  searchQuery,
}: SidebarContainerProps): JSX.Element | null {
  const [filter, setFilter] = useState(false);

  const { subject: selectedSubject, term } = useParams();

  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term as Term });
  const { data: courses, loading: coursesLoading } = useGetCourses({
    term: term as Term,
    queryParams: { in_session: filter },
  });

  const handleFilter = (s: boolean) => {
    setFilter(s);
  };

  if (searchQuery.length !== 0) {
    return (
      <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
        <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
          <Box>
            <HStack bg="white" py="2" px="4" top="0" m="0" boxShadow="md" zIndex={500}>
              <Heading pt="0.25em" color="black" size="sm">
                Search Results
              </Heading>
            </HStack>
          </Box>
          <Flex id="sideBarScroller" direction="column" overflowY="auto">
            <CustomHits selectedCourse={selectedCourse} onSelectedCourseChange={onSelectedCourseChange} />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex bg="#E4E4E4" minW="20%" flexDirection="column">
      <TopBar selectedSubject={selectedSubject} onFilter={handleFilter} />

      {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Sidebar subjects={subjects} courses={courses} />
      )}
    </Flex>
  );
}
