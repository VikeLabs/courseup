import { useState } from 'react';

import { Spinner, VStack, Heading, Flex, Box, Center, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
// import { useSavedCourses } from 'lib/hooks/useSavedCourses';
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
  // const { courses } = useSavedCourses();

  const left = (
    <>
      <TopBar>Timetable Actions</TopBar>
      <TimetableActionButtons data={data as Timetable} loading={loading} />
      <VStack align="start" p={2}>
        {/* <Heading size="md">Your {getReadableTerm((data as Timetable)?.term)} Timetable</Heading> */}
        {/* {courses.map((course) => (
          <TimetableCourseCard course={course} term={(data as Timetable).term} key={course.pid} />
        ))} */}
      </VStack>
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

  const calendarComponent = !loading && data && <ImportCalendar timetableCourses={data as Timetable} />;
  const listView = (
    <Sidebar>
      <VStack pb="60">
        {!loading &&
          data &&
          (data as Timetable).courses.map((course) => (
            <TimetableCourseCard course={course} term={(data as Timetable).term} key={course.pid} />
          ))}
      </VStack>
    </Sidebar>
  );

  // const [view, setView] = useState<'calendar' | 'list' | 'actions'>('list');
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Page
      title="View Timetable"
      leftSidebar={smallScreen ? undefined : left}
      rightSidebar={smallScreen ? undefined : right}
      mobileSupport
    >
      {smallScreen ? (
        <VStack pt={2} w="100%" h="100%" overflow="hidden" flexGrow={1} px="3">
          <Heading w="100%">
            {!loading && data ? getReadableTerm((data as Timetable).term) : 'Viewing Timetable'}
          </Heading>
          <Tabs
            w="100%"
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            isFitted
            index={tabIndex}
            onChange={(index) => {
              setTabIndex(index);
            }}
          >
            <TabList>
              <Tab>List</Tab>
              <Tab>Calendar</Tab>
              <Tab>Actions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{listView}</TabPanel>
              <TabPanel>{calendarComponent}</TabPanel>
              <TabPanel>
                {left}
                {right}
              </TabPanel>
            </TabPanels>
          </Tabs>
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
