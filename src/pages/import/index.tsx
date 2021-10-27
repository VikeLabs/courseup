// import { useParams } from 'react-router';
import { Heading, VStack, Flex, Box } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
import { getReadableTerm } from 'lib/utils';

import { Header } from 'common/header';

import { ImportButtons } from './components/ImportButtons';
import { ImportCalendar } from './components/ImportCalendar';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();

  const { loading, data } = useGetTimetable({ slug: slug });

  return (
    <>
      <Header />
      <Flex h="100vh" w="100vw">
        <VStack w="100vw" p={50} spacing={10}>
          <Heading>
            {!loading && data
              ? 'Viewing Timetable for ' + getReadableTerm((data as Timetable).term)
              : 'Viewing Timetable'}
          </Heading>
          <ImportButtons data={data as Timetable} loading={loading} />
          <Box w="70vw">{!loading && data ? <ImportCalendar data={data as Timetable} /> : <Spinner size="xl" />}</Box>
        </VStack>
      </Flex>
    </>
  );
}
