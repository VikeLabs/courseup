import { useCallback } from 'react';

import {
  Box,
  Center,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Text,
  Button,
  Alert,
  useToast,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { MdDelete, MdAdd } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

import { Term, useGetCourse } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import { CourseInfo } from '../components/Course';
import { Requisites } from '../components/Requisites';

import { SectionsContainer } from './Section';

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
  const smallScreen = useSmallScreen();
  const { addCourse, deleteCourse, contains } = useSavedCourses();
  const mode = useDarkMode();

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
    <Flex
      h="100%"
      width={['100%', 'container.xs', 'container.sm', 'container.md', 'container.lg', 'container.xl']}
      flexDirection="column"
    >
      <Helmet>{data && <title>{`${data.subject} ${data.code} · Calendar`}</title>}</Helmet>
      <Box p={4} zIndex={60}>

      <Box zIndex={60} pt={{ base: 0, sm: 4 }}>
        {error && (
          <Alert status="error" my="5">
            <pre>{error.message}</pre>
          </Alert>
        )}
        <Flex gap="1" alignItems="start" direction="column" mx="1">
          <Skeleton isLoaded={!loading} display="flex" justifyContent="space-between" alignItems="center" w="100%">
            {data && (
              <>
                <Heading fontSize={{ base: '3xl', lg: '5xl' }} as="h2">{`${data.subject} ${data.code}`}</Heading>
                {!error && (
                  <Center h="100%">
                    {smallScreen ? (
                      <IconButton
                        aria-label={courseIsSaved ? 'Remove from timetable' : 'add to timetable'}
                        icon={courseIsSaved ? <MdDelete fontSize="23px" /> : <MdAdd fontSize="23px" />}
                        onClick={handleBookmarkClick}
                        colorScheme={courseIsSaved ? 'red' : 'green'}
                        size="sm"
                        disabled={loading}
                        alignSelf="flex-end"
                      />
                    ) : (
                      <Button
                        rightIcon={courseIsSaved ? <MdDelete /> : <MdAdd />}
                        onClick={handleBookmarkClick}
                        colorScheme={courseIsSaved ? 'red' : 'green'}
                        size="sm"
                        disabled={loading}
                        alignSelf="flex-end"
                        minW="fit-content"
                      >
                        {courseIsSaved ? 'Remove from Timetable' : 'Add to Timetable'}
                      </Button>
                    )}
                  </Center>
                )}
              </>
            )}
          </Skeleton>
          <Skeleton isLoaded={!loading} pr={{ base: '0', md: '5rem' }} width="100%">
            {data && (
              <Heading fontSize={{ base: 'xl', lg: '3xl' }} as="h3" color={mode('gray', 'dark.header')}>
                {data.title}
              </Heading>
            )}
          </Skeleton>
          <Spacer />
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
              <Requisites preAndCorequisites={data.preAndCorequisites} preOrCorequisites={data.preOrCorequisites} />
              <Divider my="4" />
              <SectionsContainer term={term} subject={data.subject} code={data.code} />
            </>
          )}
        </Skeleton>
      </Box>
      <Spacer />
      <Center>
        <Skeleton isLoaded={!loading} mb={2} px={5}>
          {data && (
            <Box textAlign={{ base: 'center', sm: 'left' }}>
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
                  {smallScreen && <br />}
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
            </Box>
          )}
        </Skeleton>
      </Center>
    </Flex>
  );
}
