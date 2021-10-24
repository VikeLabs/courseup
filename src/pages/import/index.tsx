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
  const parsedData = data as Timetable;

  return (
    <>
      <Header />
      <Flex h="100vh" w="100vw">
        <VStack w="100vw" p={50} spacing={10}>
          <Heading>
            {loading ? 'Viewing Timetable' : 'Viewing Timetable for ' + getReadableTerm(parsedData['term'])}
          </Heading>
          <ImportButtons loading={loading} />
          <Box w="70vw">{loading ? <Spinner size="xl" /> : <ImportCalendar data={data as Timetable} />}</Box>
        </VStack>
      </Flex>
    </>
  );
}
