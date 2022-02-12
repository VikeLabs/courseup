import { useMemo, useState } from 'react';

import { Center, Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';

import { Course, Term, useGetCourses, useSubjects } from 'lib/fetchers';

import { CoursesList } from '../components/CoursesList';
import { CustomHits } from '../components/SearchResults';
import { SubjectsList } from '../components/SubjectsList';
// import { TopBar } from '../components/TopBar';

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

type Props = {
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
};

export function SearchableSidebar({ searchQuery, term }: Props): JSX.Element | null {
  const [filter] = useState(false);

  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term as Term });
  const { data: courses, loading: coursesLoading } = useGetCourses({
    term: term as Term,
    // eslint-disable-next-line camelcase
    queryParams: { in_session: filter },
  });

  const loading = subjectsLoading || coursesLoading;

  // sorts the list of subjects alphabetically
  const sortedSubjects = useMemo(() => subjects?.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);

  // const handleFilter = (s: boolean) => {
  //   setFilter(s);
  // };

  if (searchQuery.length !== 0) {
    return (
      <>
        <Box>
          <HStack py="4" px="4" top="0" boxShadow="md" zIndex={500}>
            <Heading size="sm">Search Results</Heading>
          </HStack>
        </Box>
        <Flex direction="column" overflowY="auto">
          <CustomHits />
        </Flex>
      </>
    );
  }

  return (
    <>
      {!loading && sortedSubjects && courses ? (
        <Routes>
          <Route path="/">
            <SubjectsList term={term} subjects={sortedSubjects} />
          </Route>
          <Route path=":subject">
            <CoursesList term={term} courses={parsedCourses} />
          </Route>
        </Routes>
      ) : (
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
