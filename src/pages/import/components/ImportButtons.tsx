import { HStack } from '@chakra-ui/layout';

import { Timetable } from 'lib/fetchers';

import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

export function ImportButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  return (
    <HStack spacing={10}>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </HStack>
  );
}
