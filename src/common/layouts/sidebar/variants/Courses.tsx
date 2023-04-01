import { useMemo } from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Center,
  Box,
  Spinner,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Skeleton,
} from '@chakra-ui/react';
import { Route, Routes, useLocation, useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';

import { Course, Term, useGetCourse, useGetCourses, useSubjects } from 'lib/fetchers';
import useLocalStorage from 'lib/hooks/storage/useLocalStorage';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getCurrentTerm } from 'lib/utils/terms';

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

export interface TopBarProps {
  filter: boolean;
  onFilter?: (filter: boolean) => void;
}

export function CoursesTopBar({ onFilter, filter }: TopBarProps): JSX.Element {
  const { term } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const mode = useDarkMode();
  const smallScreen = useSmallScreen();

  const subject = location.pathname.split('/')[3];
  const route = location.pathname.split('/')[1];

  const pid = searchParams.get('pid');

  const { data, loading } = useGetCourse({
    term: (term || getCurrentTerm()) as Term,
    pid: searchParams.get('pid') || '',
  });

  return (
    <Box
      bgColor={mode('white', 'dark.main')}
      top="0"
      m="0"
      boxShadow="md"
      zIndex={10}
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Flex justifyContent="space-between" alignItems="center" p="3">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              // Persisting the PID messes with the mobile flow
              // Since we can't show the sidebar and course info at the same time on mobile, only persist PID on large screens
              to={{ pathname: `/${route}/${term}/`, search: pid && !smallScreen ? `?pid=${pid}` : undefined }}
            >
              Subjects
            </BreadcrumbLink>
          </BreadcrumbItem>
          {smallScreen && pid && subject ? (
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={{ pathname: `/${route}/${term}/${subject}` }}>
                {subject}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            subject && (
              <BreadcrumbItem>
                <Text fontWeight="semibold">{subject}</Text>
              </BreadcrumbItem>
            )
          )}
          {smallScreen && pid && (
            <BreadcrumbItem>
              <Skeleton isLoaded={!loading}>
                <Text fontWeight="semibold">
                  {data?.subject} {data?.code}
                </Text>
              </Skeleton>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
      </Flex>
      <Box p="3" shadow="md" borderTopWidth="2px" borderTopStyle="solid">
        <FormControl>
          <Flex justifyContent="space-between" w="100%">
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="sm">
              Only Show Courses in Session
            </FormLabel>
            <Switch
              id="email-alerts"
              onChange={(e) => onFilter && onFilter(e.currentTarget.checked)}
              isChecked={filter}
            />
          </Flex>
        </FormControl>
      </Box>
    </Box>
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
  const [filter, setFilter] = useLocalStorage<boolean>('user:filter_courses', true);
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term as Term });
  const { data: courses, loading: coursesLoading } = useGetCourses({
    term: term as Term,
    // eslint-disable-next-line camelcase
    queryParams: { in_session: filter },
  });
  const smallScreen = useSmallScreen();

  const loading = subjectsLoading || coursesLoading;

  // sorts the list of subjects alphabetically
  const sortedSubjects = useMemo(() => subjects?.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);

  const handleFilter = (s: boolean) => {
    setFilter(s);
  };

  return (
    <>
      {!smallScreen && <CoursesTopBar onFilter={handleFilter} filter={filter} />}
      {!loading && sortedSubjects && courses ? (
        <Box h="100%" overflowY="auto" w="100%">
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
