import { Box, Skeleton } from '@chakra-ui/react';

import { Term, useGetCourse } from '../../fetchers';

import { CourseInfo } from './components/Course';
import { SectionsContainer } from './containers/Section';

export interface ContentProps {
  /**
   * Content
   * Subject to change
   */
  pid: string;
  term: Term;
}

/**
 * Primary UI component for content
 */
export function Content({ pid, term }: ContentProps): JSX.Element {
  const { data, loading } = useGetCourse({ term, pid });

  return (
    <Box maxWidth="1080px" bg="white" p="5" my="4" height="100%" boxShadow="sm" zIndex={60}>
      <Skeleton isLoaded={!loading}>
        {data && (
          <>
            <CourseInfo
              subject={data.subject}
              code={data.code}
              title={data.title}
              description={data.description || ''}
              credits={data.credits.value}
            />
            <SectionsContainer term={term} subject={data.subject} code={data.code} />
          </>
        )}
      </Skeleton>
    </Box>
  );
}
