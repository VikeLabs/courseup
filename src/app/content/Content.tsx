import { Box, Center, Flex, Heading, Skeleton, Spacer, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import { Term, useGetCourse } from '../../shared/fetchers';

import { CourseInfo } from './components/Course';
import { SectionsContainer } from './containers/Section';

export type ContentProps = {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
};

/**
 * Primary UI component for content
 */
export function Content({ term }: ContentProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const { data, loading } = useGetCourse({ term, pid: searchParams.get('pid') || '' });

  return (
    <Flex width={['container.md', 'container.lg', 'container.xl']} flexDirection="column" minH="100%">
      <Helmet>
        <title>{`${data?.subject || 'clockwork · We make school easier'} ${
          data?.code ? data?.code + ' · View Courses · clockwork' : ''
        }`}</title>
      </Helmet>
      <Box bg="white" p={4} zIndex={60}>
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
                credits={data.credits}
                hours={data.hoursCatalog}
              />
              <SectionsContainer term={term} subject={data?.subject} code={data?.code} />
            </>
          )}
        </Skeleton>
      </Box>
      <Spacer />
      <Center>
        <Text as="span" fontWeight="bold" fontSize={12} mb={2}>
          Sources:
          <Text as="span" color="blue.500" fontWeight="light">
            <Text
              as="a"
              href={`https://www.uvic.ca/calendar/undergrad/index.php#/courses/${data?.pid}`}
              target="_blank"
              mx="3"
              _hover={{ color: 'blue' }}
            >
              UVic Undergraduate Calendar
            </Text>
            <Text
              as="a"
              href={`https://www.uvic.ca/BAN1P/bwckctlg.p_disp_listcrse?term_in=${term}&subj_in=${data?.subject}&crse_in=${data?.code}&schd_in=`}
              target="_blank"
              _hover={{ color: 'blue' }}
              ml="2"
            >
              UVic Class Schedule Listings
            </Text>
          </Text>
        </Text>
      </Center>
    </Flex>
  );
}
