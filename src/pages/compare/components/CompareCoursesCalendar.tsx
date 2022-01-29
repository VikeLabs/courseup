import { Spinner, Box } from '@chakra-ui/react';

import { Timetable } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { ImportCalendar } from 'pages/import/components/ImportCalendar';

export function CompareCoursesCalendar({ loading, data }: { loading: boolean; data: Timetable }) {
  const { courses } = useSavedCourses();
  return !loading && data ? (
    <Box w="100%" h="500px" px="3" py="2">
      <ImportCalendar saved_courses={courses} timetable_courses={data} />
    </Box>
  ) : (
    <Spinner size="xl" />
  );
}
