import { useState } from 'react';

import { Spinner, VStack, Heading, HStack, Flex, Box, ButtonGroup, Button, Center } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';
import { TopBar } from 'common/layouts/sidebar/components/TopBar';
import { Sidebar } from 'common/layouts/sidebar/containers/Sidebar';

import { ImportCalendar } from './components/ImportCalendar';
import { TimetableActionButtons } from './components/TimetableActionButtons';
import { TimetableCourseCard } from './components/TimetableCourseCard';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();
  const smallScreen = useSmallScreen();

  const { loading, data } = useGetTimetable({ slug: slug });

  const left = (
    <>
      <TopBar>Timetable Actions</TopBar>
      <TimetableActionButtons data={data as Timetable} loading={loading} />
    </>
  );

  const right = (
    <>
      <TopBar>Included Courses</TopBar>
      <Box h="100%" overflowY="auto" pb="20">
        {!loading && data && (
          <VStack>
            {(data as Timetable).courses.map((course) => (
              <TimetableCourseCard course={course} term={(data as Timetable).term} />
            ))}
          </VStack>
        )}
      </Box>
    </>
  );

  const calendarComponent = <ImportCalendar timetableCourses={data as Timetable} />;
  const listView = (
    <Sidebar>
      <VStack pb="60">
        {!loading &&
          data &&
          (data as Timetable).courses.map((course) => (
            <TimetableCourseCard course={course} term={(data as Timetable).term} />
          ))}
      </VStack>
    </Sidebar>
  );

  const [calendarView, setCalendarView] = useState(false);

  return (
    <Page title="View Timetable" leftSidebar={left} rightSidebar={right} mobileSupport>
      {smallScreen ? (
        <VStack pt={2} w="100%" h="100%" overflow="hidden" grow={1} px="3">
          <HStack justify="space-between" w="100%">
            <Heading>{!loading && data ? getReadableTerm((data as Timetable).term) : 'Viewing Timetable'}</Heading>
            <ButtonGroup isAttached colorScheme="green">
              <Button isActive={!calendarView} onClick={() => setCalendarView(false)}>
                List
              </Button>
              <Button onClick={() => setCalendarView(true)}>Calendar</Button>
            </ButtonGroup>
          </HStack>
          <Box w="100%">
            <TimetableActionButtons loading={loading} data={data as Timetable} />
          </Box>
          {!loading && data ? calendarView ? calendarComponent : listView : <Spinner size="xl" />}
        </VStack>
      ) : (
        <VStack pt={2} w="100%" height="100%" overflow="hidden" flexGrow={1}>
          <Heading textAlign="center">
            {!loading && data
              ? 'Viewing Timetable for ' + getReadableTerm((data as Timetable).term)
              : 'Viewing Timetable'}
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
