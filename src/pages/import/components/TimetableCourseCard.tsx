import { useMemo, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex, VStack, Text, Skeleton, IconButton, Collapse, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { CourseDetails, Term, TimetableCourse, useGetCourse } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { SavedCourseWithSections } from 'pages/scheduler/shared/types';

function SectionInfoRow({ term, courses }: { term: Term; courses: SavedCourse[] }): JSX.Element {
  const coursesResult = useGetCourseSections(term, courses);
  const course: SavedCourseWithSections = useMemo(() => {
    return coursesResult.status === 'loaded' && coursesResult.data
      ? coursesResult.data[0]
      : { ...courses[0], sections: [] };
  }, [coursesResult, courses]);
  console.log(coursesResult);
  // const sections = useMemo(() => {
  //   coursesResult.status === 'loaded' && coursesResult.data ?
  //   coursesResult.data[0].sections : []}, [coursesResult])

  // const sectionTypes = useMemo(() =>
  // Array.from(new Set(sections.map((s) => s.sectionType))), [sections]);

  const mode = useDarkMode();
  return (
    <>
      {
        coursesResult.status === 'loaded' && coursesResult.data ? (
          <Box bgColor={mode('white', 'dark.main')}>
            <HStack
              px="3"
              my="0.5"
              fontSize="12px"
              borderTop={mode('light.background', 'dark.background')}
              borderTopWidth="2"
              borderTopStyle="solid"
            >
              <Text as="strong">
                {course
                  ? course.sections[course.sections.map((s) => s.sectionCode).indexOf(courses[0].lecture ?? '')]
                      .sectionCode
                  : ''}
              </Text>
              <VStack flexGrow={1} py="1.5">
                {course
                  ? course.sections[
                      course.sections.map((s) => s.sectionCode).indexOf(courses[0].lecture ?? '')
                    ].meetingTimes.map((m, key) => (
                      <HStack key={key} w="100%" px="5">
                        <Box w="33%" minW="27%">
                          {m.time.split('-').map((time) => (
                            <Text key={time}>{time}</Text>
                          ))}
                        </Box>
                        <Box w="20%" minW="13%">
                          {m.days}
                        </Box>
                        <Box w="47%">{m.where}</Box>
                      </HStack>
                    ))
                  : ''}
              </VStack>
            </HStack>
          </Box>
        ) : (
          <></>
        )
        // sectionTypes.map((type) => (
        //   <HStack
        //     as="label"
        //     px="3"
        //     my="0.5"
        //     fontSize="12px"
        //     borderTop={mode('light.background', 'dark.background')}
        //     borderTopWidth="2"
        //     borderTopStyle="solid"
        //   >
        //     <HStack>
        //       <Text as="strong">{sectionCode}</Text>
        //     </HStack>
        //     <VStack flexGrow={1} py="1.5">
        //       {meetingTimes.map((m, key) => (
        //         <HStack key={key} w="100%" px="5">
        //           <Box w="33%" minW="27%">
        //             {m.time.split('-').map((time) => (
        //               <Text key={time}>{time}</Text>
        //             ))}
        //           </Box>
        //           <Box w="20%" minW="13%">
        //             {m.days}
        //           </Box>
        //           <Box w="47%">{m.where}</Box>
        //         </HStack>
        //       ))}
        //     </VStack>
        //   </HStack>
        // ))}
        // ))
      }
    </>
  );
}

type TopRowProps = {
  color: string;
  term: Term;
  subject: string;
  pid: string;
  code: string;
  loading: boolean;
  data: CourseDetails | null;
  toggleSection: () => void;
  showSection: boolean;
};

function TopRow({
  color,
  term,
  subject,
  pid,
  code,
  loading,
  data,
  toggleSection,
  showSection,
}: TopRowProps): JSX.Element {
  const mode = useDarkMode();
  return (
    <Box boxShadow="md" w="100%" bgColor={mode('white', 'dark.main')}>
      <Flex direction="row">
        <Box w="20%" background={color} mr="10px" />
        <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%">
          <Flex grow={1}>
            <VStack
              alignItems="start"
              spacing="0"
              py="2"
              as={RouterLink}
              to={`/calendar/${term}/${subject}?pid=${pid}`}
            >
              <Text fontSize="lg" fontWeight="bold" tabIndex={0}>
                {subject} {code}
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                <Skeleton isLoaded={!loading}>{data?.title ?? ' '}</Skeleton>
              </Text>
            </VStack>
          </Flex>
          <VStack alignContent="right" pr="3" py="5px">
            <IconButton
              aria-label="More information"
              icon={
                showSection ? (
                  <ChevronUpIcon color="white" boxSize="1.5em" />
                ) : (
                  <ChevronDownIcon color="white" boxSize="1.5em" />
                )
              }
              colorScheme="blue"
              size="xs"
              onClick={toggleSection}
            />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}

export function TimetableCourseCard({ course, term }: { course: TimetableCourse; term: Term }): JSX.Element {
  const { subject, color, code, pid } = course;
  const { data, loading } = useGetCourse({ pid: pid, term: term });

  const savedCourse: SavedCourse = {
    subject: course.subject,
    pid: course.pid,
    code: course.code,
    term: term,
    lecture: course.lecture ? course.lecture[0] : undefined,
    lab: course.lab ? course.lab[0] : undefined,
    tutorial: course.tutorial ? course.tutorial[0] : undefined,
  };

  const [showSection, setShowSection] = useState(false);

  const handleToggle = () => setShowSection(!showSection);

  return (
    <VStack mt="1" spacing="0" w="80%" maxW="400px">
      <TopRow
        color={color}
        term={term}
        subject={subject}
        pid={pid}
        code={code}
        loading={loading}
        data={data}
        toggleSection={handleToggle}
        showSection={showSection}
      />
      \
      <Collapse in={showSection} animateOpacity style={{ width: '100%' }}>
        <SectionInfoRow courses={[savedCourse]} term={term} />
      </Collapse>
    </VStack>
  );
}
