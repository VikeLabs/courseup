import { useEffect, useState } from 'react';

import { Spinner, VStack, Heading, HStack, Flex, Box, ButtonGroup, Button, Center } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Term, Timetable, TimetableCourse, useGetTimetable } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';
import { TopBar } from 'common/layouts/sidebar/components/TopBar';
import { Sidebar } from 'common/layouts/sidebar/containers/Sidebar';

import { ImportCalendar } from './components/ImportCalendar';
import { TimetableActionButtons } from './components/TimetableActionButtons';
import { TimetableCourseCard } from './components/TimetableCourseCard';
import { TimetableCourseTags } from './components/TimetableCourseTags';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();
  const smallScreen = useSmallScreen();

  const { loading, data } = useGetTimetable({ slug: slug });
  const [courses, setCourses] = useState<TimetableCourse[]>([]);
  const [term, setTerm] = useState<Term>('202205');

  useEffect(() => {
    if (data) {
      setCourses((data as Timetable).courses);
      setTerm((data as Timetable).term);
    }
  }, [data]);

  const left = (
    <>
      <TopBar>Timetable Actions</TopBar>
      <TimetableActionButtons data={data as Timetable} loading={loading} />
      {smallScreen && <TimetableCourseTags courses={courses} term={term} />}
    </>
  );

  const right = !smallScreen ? (
    <>
      <TopBar>Included Courses</TopBar>
      <Box h="100%" overflowY="auto" pb="20">
        {!loading && data && (
          <VStack>
            {courses.map((course) => (
              <TimetableCourseCard course={course} term={term} />
            ))}
          </VStack>
        )}
      </Box>
    </>
  ) : undefined;

  const calendarComponent = <ImportCalendar timetableCourses={data as Timetable} />;
  const listView = (
    <Sidebar>
      <VStack pb="60">
        {!loading && data && courses.map((course) => <TimetableCourseCard course={course} term={term} />)}
      </VStack>
    </Sidebar>
  );

  const [calendarView, setCalendarView] = useState(false);

  return (
    <Page title="View Timetable" leftSidebar={left} rightSidebar={right} mobileSupport>
      {smallScreen ? (
        <VStack pt={2} w="100%" h="100%" overflow="hidden" flexGrow={1} px={1}>
          <HStack justify="space-between" w="100%">
            <Heading>{!loading && data ? getReadableTerm(term) : 'Viewing Timetable'}</Heading>
            <ButtonGroup isAttached colorScheme="green">
              <Button isActive={!calendarView} onClick={() => setCalendarView(false)}>
                List
              </Button>
              <Button isActive={calendarView} onClick={() => setCalendarView(true)}>
                Calendar
              </Button>
            </ButtonGroup>
          </HStack>
          {!loading && data ? calendarView ? calendarComponent : listView : <Spinner size="xl" />}
        </VStack>
      ) : (
        <VStack pt={2} w="100%" height="100%" overflow="hidden" flexGrow={1}>
          <Heading textAlign="center">
            {!loading && data ? 'Viewing Timetable for ' + getReadableTerm(term) : 'Viewing Timetable'}
          </Heading>
          <Flex w="100%" height="100%">
            {!loading && data ? (
              <ImportCalendar timetableCourses={data as Timetable} />
            ) : (
              <Center w="100%" h="100%">
                <Spinner size="xl" />
              </Center>
            )}
          </Flex>
        </VStack>
      )}
    </Page>
  );
}
