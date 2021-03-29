import { Box, Skeleton } from '@chakra-ui/react';

import { SelectedCourse } from '../../calendar';
import { Term, useGetCourse } from '../../fetchers';

import { CourseInfo } from './components/Course';
import { SectionsContainer } from './containers/Section';

export interface ContentProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  selectedCourse: SelectedCourse;
}

export function Content({ term, selectedCourse: { pid, subject, code } }: ContentProps): JSX.Element {
  const { data, loading } = useGetCourse({ term, pid });

  return (
    <Box maxWidth="85%" bg="white" p="5" my="4" height="100%" boxShadow="sm" zIndex={60}>
      <Skeleton isLoaded={!loading}>
        {data && (
          <CourseInfo
            subject={data.subject}
            code={data.code}
            title={data.title}
            description={data.description || ''}
            credits={data.credits.value}
          />
        )}
        <SectionsContainer term={term} subject={subject} code={code} />
      </Skeleton>
    </Box>
  );
}
