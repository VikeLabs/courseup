import { HStack, VStack } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';

import { Timetable } from 'lib/fetchers';

import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

export function TimetableActionButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');

  return isMobile ? (
    <VStack>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </VStack>
  ) : (
    <HStack spacing={10}>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </HStack>
  );
}
