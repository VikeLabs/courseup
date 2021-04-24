import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react';

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

/**
 * Primary UI component for content
 */
export function Content({ term, selectedCourse: { pid, subject, code, title } }: ContentProps): JSX.Element {
  const { data, loading } = useGetCourse({ term, pid });

  return (
    <Box
      width={['container.md', 'container.lg', 'container.xl']}
      bg="white"
      p="5"
      my="4"
      height="100%"
      boxShadow="sm"
      zIndex={60}
    >
      <Flex
        justifyItems="center"
        alignItems={{ base: 'start', sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Heading mr="5" size="2xl" as="h2" whiteSpace="pre" color="black">{`${subject} ${code}`}</Heading>
        <Heading size="lg" as="h3" color="gray">
          {title}
        </Heading>
      </Flex>

      <Skeleton isLoaded={!loading}>
        {data && (
          <CourseInfo
            subject={data.subject}
            code={data.code}
            title={data.title}
            description={data.description || ''}
            credits={data.credits}
            hours={data.hoursCatalog}
          />
        )}
        <SectionsContainer term={term} subject={subject} code={code} />
      </Skeleton>
    </Box>
  );
}
