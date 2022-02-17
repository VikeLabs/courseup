import { VStack } from '@chakra-ui/layout';

import { Timetable } from 'lib/fetchers';

import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

type Props = {
  loading: boolean;
  data: Timetable;
};

export function TimetableActionButtons({ loading, data }: Props): JSX.Element {
  return (
    <VStack>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </VStack>
  );
}
