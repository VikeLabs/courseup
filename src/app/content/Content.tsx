import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { Term, useGetCourse } from '../../shared/fetchers';

import { CourseInfo } from './components/Course';
import { SectionsContainer } from './containers/Section';

export interface ContentProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
}

/**
 * Primary UI component for content
 */
export function Content({ term }: ContentProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const { data, loading } = useGetCourse({ term, pid: searchParams.get('pid') || '' });

  return (
    <Box width={['container.md', 'container.lg', 'container.xl']} bg="white" p={4} zIndex={60}>
      <Flex
        justifyItems="center"
        alignItems={{ base: 'start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Heading mr="5" size="2xl" as="h2" whiteSpace="pre" color="black">{`${data?.subject || ''} ${
          data?.code || ''
        }`}</Heading>
        {!loading && data && (
          <Heading size="lg" as="h3" color="gray">
            {data.title}
          </Heading>
        )}
      </Flex>
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
            <SectionsContainer term={term} subject={data?.subject} code={data?.code} />
          </>
        )}
      </Skeleton>
    </Box>
  );
}
