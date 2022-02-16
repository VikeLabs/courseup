import { VStack } from '@chakra-ui/layout';

import { Timetable } from 'lib/fetchers';

import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

export function TimetableActionButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  return (
    <VStack>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </VStack>
  );
}
