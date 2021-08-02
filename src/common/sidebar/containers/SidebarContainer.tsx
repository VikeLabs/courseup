import { useMemo, useState } from 'react';

import { Center, Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { Course, Term, useGetCourses, useSubjects } from 'lib/fetchers';
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode';

import { CoursesList } from '../components/CoursesList';
import { CustomHits } from '../components/SearchResults';
import { SubjectsList } from '../components/SubjectsList';
import { TopBar } from '../components/TopBar';

function computeParsedCourses(courses: Course[] | null) {
  if (!courses) {
    return {};
  }

  return (
    courses.reduce((dict, course) => {
      const subject = course.subject;
      if (!(subject in dict)) {
        dict[subject] = [];
      }
      dict[subject].push(course);
      return dict;
    }, {} as { [subject: string]: Course[] }) ?? {}
  );
}

export interface SidebarContainerProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  /**
   * Search Query for the search bar
   * EX) CSC, computer Science
   */
  searchQuery: string;
}

export function SidebarContainer({ searchQuery, term }: SidebarContainerProps): JSX.Element | null {
  const [filter, setFilter] = useState(false);
  const isDarkMode = useIsDarkMode();

  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term as Term });
  const { data: courses, loading: coursesLoading } = useGetCourses({
    term: term as Term,
    queryParams: { in_session: filter },
  });

  const loading = subjectsLoading || coursesLoading;

  // sorts the list of subjects alphabetically
  const sortedSubjects = useMemo(() => subjects?.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);

  const handleFilter = (s: boolean) => {
    setFilter(s);
  };

  if (searchQuery.length !== 0) {
    return (
      <Flex
        bgColor={isDarkMode ? 'dark.background' : 'light.background'}
        justifyContent="center"
        alignItems="center"
        minW="20%"
      >
        <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
          <Box>
            <HStack bg="white" py="2" px="4" top="0" m="0" boxShadow="md" zIndex={500}>
              <Heading pt="0.25em" color="black" size="sm">
                Search Results
              </Heading>
            </HStack>
          </Box>
          <Flex id="sideBarScroller" direction="column" overflowY="auto">
            <CustomHits />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex bgColor={isDarkMode ? 'dark.background' : 'light.background'} minW="20%" flexDirection="column">
      <TopBar onFilter={handleFilter} />
      {!loading && sortedSubjects && courses ? (
        <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
          <Flex direction="column" overflowY="auto">
            <Routes>
              <Route path="/">
                <SubjectsList term={term} subjects={sortedSubjects} />
              </Route>
              <Route path=":subject">
                <CoursesList term={term} courses={parsedCourses} />
              </Route>
            </Routes>
          </Flex>
        </Flex>
      ) : (
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </Flex>
  );
}
