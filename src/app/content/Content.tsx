import { Box, Skeleton } from '@chakra-ui/react';

import { Term, useGetCourse } from '../../fetchers';

import { CourseInfo } from './components/Course';
import { SectionsContainer } from './containers/Section';

export interface ContentProps {
  /**
   * Content
   * Subject to change
   */
  /**
   * pid of selected course
   */
  pid: string;
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  /**
   * subject of selected course
   */
  subject: string;
  /**
   * code of selected course
   */
  code: string;
}

/**
 * Primary UI component for content
 */
export function Content({ pid, term, subject, code }: ContentProps): JSX.Element {
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
            <SectionsContainer term={term} subject={subject} code={code} />
          </>
        )}
      </Skeleton>
    </Box>
  );
}
