import { HStack } from '@chakra-ui/layout';
import { useMatch } from 'react-router';

import { Timetable } from 'lib/fetchers';

import { BackTimetable } from './BackTimetable';
import { CompareTimetables } from './CompareTimetables';
import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

export function ImportButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const compareMatch = useMatch('/c/*');

  return (
    <HStack spacing={10}>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
      {compareMatch ? <BackTimetable /> : <CompareTimetables loading={loading} data={data} />}
    </HStack>
  );
}
