import { Box, Center, Flex, Heading, Skeleton, Spacer, Text, Button, Alert, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { MdDelete, MdAdd } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

import { Term, useGetCourse } from '../../shared/fetchers';
import { useSavedCourses } from '../../shared/hooks/useSavedCourses';

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
  const toast = useToast();
  const { data, loading, error } = useGetCourse({ term, pid: searchParams.get('pid') || '' });

  const { addCourse, deleteCourse, contains } = useSavedCourses();

  const courseIsSaved = contains(data?.pid!, term);

  const handleBookmarkClick = useCallback(() => {
    if (data) {
      if (!courseIsSaved) {
        addCourse(term, data.subject, data.code, data.pid);
        toast({ status: 'success', title: 'Added course to timetable!' });
      } else {
        deleteCourse({ subject: data.subject, code: data.code, pid: data.pid, term });
        toast({ status: 'info', title: 'Removed course from timetable!' });
      }
    }
  }, [data, courseIsSaved, addCourse, term, deleteCourse, toast]);

  return (
    <Flex width={['container.md', 'container.lg', 'container.xl']} flexDirection="column">
      <Helmet>{data && <title>{`${data.subject} ${data.code} · Calendar`}</title>}</Helmet>

      <Box bg="white" p={4} zIndex={60}>
        {error && (
          <Alert status="error" my="5">
            <pre>{error.message}</pre>
          </Alert>
        )}
        <Flex
          justifyItems="center"
          alignItems={{ base: 'start', sm: 'center' }}
          direction={{ base: 'column', sm: 'row' }}
        >
          <Skeleton isLoaded={!loading} display="flex" flexDirection="row" alignItems="center">
            {data && (
              <>
                <Heading
                  mr="5"
                  size="2xl"
                  as="h2"
                  whiteSpace="pre"
                  color="black"
                >{`${data.subject} ${data.code}`}</Heading>
                <Heading size="lg" as="h3" color="gray">
                  {data.title}
                </Heading>
              </>
            )}
          </Skeleton>
          <Spacer />
          {!error && (
            <Button
              rightIcon={courseIsSaved ? <MdDelete /> : <MdAdd />}
              onClick={handleBookmarkClick}
              colorScheme={courseIsSaved ? 'red' : 'green'}
              size="sm"
              disabled={loading}
            >
              {courseIsSaved ? 'Remove from Timetable' : 'Add to Timetable'}
            </Button>
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
                pid={data.pid}
                term={term}
              />
              <SectionsContainer term={term} subject={data.subject} code={data.code} />
            </>
          )}
        </Skeleton>
      </Box>
      <Spacer />
      <Center>
        <Skeleton isLoaded={!loading} mb={2}>
          {data && (
            <Text as="span" fontWeight="bold" fontSize={12}>
              Sources:
              <Text as="span" color="blue.500" fontWeight="light">
                <Text
                  as="a"
                  href={`https://www.uvic.ca/calendar/undergrad/index.php#/courses/${data.pid}`}
                  target="_blank"
                  mx="3"
                  _hover={{ color: 'blue' }}
                >
                  UVic Undergraduate Calendar
                </Text>
                <Text
                  as="a"
                  href={`https://www.uvic.ca/BAN1P/bwckctlg.p_disp_listcrse?term_in=${term}&subj_in=${data.subject}&crse_in=${data.code}&schd_in=`}
                  target="_blank"
                  _hover={{ color: 'blue' }}
                  ml="2"
                >
                  UVic Class Schedule Listings
                </Text>
              </Text>
            </Text>
          )}
        </Skeleton>
      </Center>
    </Flex>
  );
}
