import { CalendarIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Heading, VStack, Center, Tabs, TabList, Tab, TabPanels, TabPanel, Text, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';

import { Header } from 'common/header';

import { TimetableActionButtons } from 'pages/import/components/TimetableActionButtons';

import { CompareCoursesCalendar } from './components/CompareCoursesCalendar';
import { CompareCoursesList } from './components/CompareCoursesList';

export function TimetableComparison(): JSX.Element {
  const { slug } = useParams();

  const { loading, data } = useGetTimetable({ slug: slug });

  return (
    <>
      <Header />
      <Flex w="100vw" h="100vh" direction="column" overflowX="hidden">
        <VStack p={50} spacing={5}>
          <Heading>Comparing Timetables</Heading>
          <TimetableActionButtons data={data as Timetable} loading={loading} />
          <Tabs variant="soft-rounded" colorScheme="green" align="center" size="lg">
            <TabList>
              <Tab>
                <HStack>
                  <HamburgerIcon />
                  <Text>List</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <CalendarIcon />
                  <Text>Calendar</Text>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CompareCoursesList loading={loading} data={data as Timetable} />
              </TabPanel>
              <TabPanel>
                <Center w="70vw">
                  <CompareCoursesCalendar loading={loading} data={data as Timetable} />
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </>
  );
}
