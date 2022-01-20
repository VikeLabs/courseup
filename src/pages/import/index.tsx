import { Heading, VStack, Flex, Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
import { getReadableTerm } from 'lib/utils/terms';

import { Header } from 'common/header';

import { ImportCalendar } from './components/ImportCalendar';
import { TimetableActionButtons } from './components/TimetableActionButtons';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();

  const { loading, data } = useGetTimetable({ slug: slug });

  return (
    <>
      <Header />
      <Flex w="100vw" h="100vh" direction="column">
        <VStack p={50} spacing={5}>
          <Heading>
            {!loading && data
              ? 'Viewing Timetable for ' + getReadableTerm((data as Timetable).term)
              : 'Viewing Timetable'}
          </Heading>
          <TimetableActionButtons data={data as Timetable} loading={loading} />
          <Center w="70vw">
            {!loading && data ? <ImportCalendar data={data as Timetable} /> : <Spinner size="xl" />}
          </Center>
        </VStack>
      </Flex>
    </>
  );
}
