import { useMemo, useState } from 'react';

// import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Center,
  Box,
  Spinner,
  //   Breadcrumb,
  //   BreadcrumbItem,
  //   BreadcrumbLink,
  //   useDisclosure,
  //   //   Text,
  //   Collapse,
  //   FormControl,
  //   Flex,
  //   FormLabel,
  //   Switch,
} from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
// import { Link, useSearchParams } from 'react-router-dom';

import { Course, Term, useGetCourses, useSubjects } from 'lib/fetchers';

import { CoursesList } from '../components/CoursesList';
import { SubjectsList } from '../components/SubjectsList';

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
};

export function Courses({ term }: Props): JSX.Element | null {
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

  //topbar
  //   const { isOpen, onToggle } = useDisclosure();
  //   const location = useLocation();
  //   const [searchParams] = useSearchParams();

  //   const subject = location.pathname.split('/')[3];
  //   const route = location.pathname.split('/')[1];

  //   const pid = searchParams.get('pid');

  //   const handleFilter = (s: boolean) => {
  //     setFilter(s);
  //   };

  return (
    <>
      {!loading && sortedSubjects && courses ? (
        <Box h="100%" overflowY="auto">
          <Routes>
            <Route path="/">
              <SubjectsList term={term} subjects={sortedSubjects} />
            </Route>
            <Route path=":subject">
              <CoursesList term={term} courses={parsedCourses} />
            </Route>
          </Routes>
        </Box>
      ) : (
        <Center h="100%" w="100%">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}
