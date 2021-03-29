import { Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { SelectedCourse } from '../../../calendar';
import { Term, useGetCourses, useSubjects } from '../../../fetchers';
import { CustomHits } from '../components/SearchResults';
import { Sidebar } from '../Sidebar';

export interface SidebarContainerProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;

  searchQuery: string;
  selectedCourse?: SelectedCourse;
  setSelectedCourse: Dispatch<SetStateAction<SelectedCourse | undefined>>;
}

export function SidebarContainer({
  term,
  selectedCourse,
  setSelectedCourse,
  searchQuery,
}: SidebarContainerProps): JSX.Element | null {
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term });

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
            <CustomHits selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
      {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Spinner size="xl" />
      ) : (
        <Sidebar
          subjects={subjects}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
    </Flex>
  );
}
