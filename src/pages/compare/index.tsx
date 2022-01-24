import { useEffect, useState } from 'react';

import { Flex, Heading, VStack, Center, Spinner, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Timetable, useGetTimetable } from 'lib/fetchers';
import { SavedCourse, useSavedCourses } from 'lib/hooks/useSavedCourses';
import { groupCoursesBy } from 'lib/utils/courses';
import { getReadableTerm } from 'lib/utils/terms';

import { Header } from 'common/header';

import { TimetableActionButtons } from 'pages/import/components/TimetableActionButtons';
import { SelectedCoursesCardList } from 'pages/scheduler/components/share/SelectedCoursesCardList';

export function TimetableComparison(): JSX.Element {
  const { slug } = useParams();
  const [timetableCourses, setTimetableCourses] = useState<SavedCourse[]>([]);
  const [timetableTerm, settimetableTerm] = useState('');
  const { courses } = useSavedCourses();
  const coursesBySection = groupCoursesBy(courses);

  const savedCoursesCards = Object.entries(coursesBySection).map(([term, courses]) => {
    return (
      term !== timetableTerm && (
        <>
          <Heading size="md">{getReadableTerm(term)}</Heading>
          <SelectedCoursesCardList courses={courses} term={term} />
        </>
      )
    );
  });

  const { loading, data } = useGetTimetable({ slug: slug });

  useEffect(() => {
    if (!loading && data) {
      const newCourseList: SavedCourse[] = (data as Timetable).courses.map((course) => {
        return {
          subject: course.subject,
          pid: course.pid,
          code: course.code,
          term: (data as Timetable).term,
          lecture: course.lecture ? course.lecture[0] : undefined,
          lab: course.lab ? course.lab[0] : undefined,
          tutorial: course.tutorial ? course.tutorial[0] : undefined,
          color: course.color,
          selected: true,
        };
      });

      setTimetableCourses(newCourseList);
      settimetableTerm((data as Timetable).term);
    }
  }, [data, loading]);

  return (
    <>
      <Header />
      <Flex w="100vw" h="100vh" direction="column" overflowX="hidden">
        <VStack p={50} spacing={5}>
          <Heading>Comparing Timetables</Heading>
          <TimetableActionButtons data={data as Timetable} loading={loading} />
          <Center w="70vw">
            {!loading && data ? (
              <HStack spacing={20} align={'start'}>
                <VStack spacing={8}>
                  <Heading>Your Saved Courses</Heading>
                  <Heading size="md">{getReadableTerm(timetableTerm)}</Heading>
                  <SelectedCoursesCardList courses={coursesBySection[timetableTerm] || []} term={timetableTerm} />
                  {savedCoursesCards}
                </VStack>
                <VStack spacing={8}>
                  <Heading>Timetable Courses</Heading>
                  <Heading size="md">{getReadableTerm(timetableTerm)}</Heading>
                  <SelectedCoursesCardList courses={timetableCourses} term={timetableTerm} />
                </VStack>
              </HStack>
            ) : (
              <Spinner size="xl" />
            )}
          </Center>
        </VStack>
      </Flex>
    </>
  );
}
