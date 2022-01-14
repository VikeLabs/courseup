import { Heading, VStack, Flex, Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
import { getReadableTerm } from 'lib/utils/terms';

import { Header } from 'common/header';

import { ImportButtons } from './components/ImportButtons';
import { ImportCalendar } from './components/ImportCalendar';

export function ImportTimetable(): JSX.Element {
  const { slug } = useParams();

  const { loading, data } = useGetTimetable({ slug: slug });

  return (
    <>
      <Header />
      <Flex w="100vw" h="100vh" direction="column" overflowX="hidden">
        <VStack p={50} spacing={10} mb={50}>
          <Heading>
            {!loading && data
              ? 'Viewing Timetable for ' + getReadableTerm((data as Timetable).term)
              : 'Viewing Timetable'}
          </Heading>
          <ImportButtons data={data as Timetable} loading={loading} />
          <Center w="70vw">
            {!loading && data ? <ImportCalendar data={data as Timetable} /> : <Spinner size="xl" />}
          </Center>
        </VStack>
      </Flex>
    </>
  );
}
