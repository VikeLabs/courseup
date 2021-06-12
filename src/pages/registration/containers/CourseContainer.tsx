import { Heading, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Collapse } from '@chakra-ui/transition';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { useSeats, useSections, Term, Seat } from '../../../lib/fetchers';
import { SavedCourse } from '../../../lib/hooks/useSavedCourses';
import { RegistrationMinimized } from '../components/RegistrationMinimized';
import { RegistrationSection } from '../components/RegistrationSection';

type Props = {
  course: SavedCourse;
};

type Data = {
  crn: string;
  additionalNotes?: string;
  seats?: Seat;
  selected: boolean;
};

export function CourseContainer({ course }: Props) {
  const { term } = useParams();
  const [data, setData] = useState<{ lab?: Data; lecture?: Data; tutorial?: Data }>({});
  const termType = term as Term;

  const { data: sections, loading } = useSections({
    term: termType,
    queryParams: { subject: course.subject, code: course.code },
  });
  const { data: seats } = useSeats({
    term: termType,
    queryParams: { subject: course.subject, code: course.code },
  });

  useEffect(() => {
    if (!loading) {
      const lecture = sections?.find((section) => section.sectionCode === course.lecture);
      const lab = sections?.find((section) => section.sectionCode === course.lab);
      const tutorial = sections?.find((section) => section.sectionCode === course.tutorial);

      setData({
        lecture: lecture
          ? {
              crn: lecture.crn,
              seats: seats?.find((e) => e.crn === lecture.crn),
              additionalNotes: lecture.additionalNotes,
              selected: true,
            }
          : undefined,
        lab: lab
          ? {
              crn: lab.crn,
              seats: seats?.find((e) => e.crn === lab.crn),
              additionalNotes: lab.additionalNotes,
              selected: true,
            }
          : undefined,
        tutorial: tutorial
          ? {
              crn: tutorial.crn,
              seats: seats?.find((e) => e.crn === tutorial.crn),
              additionalNotes: tutorial.additionalNotes,
              selected: true,
            }
          : undefined,
      });
    }
  }, [course.lab, course.lecture, course.tutorial, loading, seats, sections]);

  const handleChange = useCallback(
    ({ crn, seats, selected }: Data) => {
      if (data.lecture && data.lecture.crn === crn) {
        setData({
          ...data,
          lecture: { crn, seats, selected: selected, additionalNotes: data.lecture.additionalNotes },
        });
      } else if (data.lab && data.lab.crn === crn) {
        setData({ ...data, lab: { crn, seats, selected: selected, additionalNotes: data.lab.additionalNotes } });
      } else if (data.tutorial && data.tutorial.crn === crn) {
        setData({
          ...data,
          tutorial: { crn, seats, selected: selected, additionalNotes: data.tutorial.additionalNotes },
        });
      }
    },
    [data]
  );

  const isMinimized = useMemo(() => !data.lab?.selected && !data.lecture?.selected && !data.tutorial?.selected, [
    data.lab?.selected,
    data.lecture?.selected,
    data.tutorial?.selected,
  ]);

  const handleMinimizedChange = useCallback(() => {
    setData({
      lecture: data.lecture
        ? {
            crn: data.lecture.crn,
            seats: data.lecture.seats,
            selected: true,
            additionalNotes: data.lecture.additionalNotes,
          }
        : undefined,
      lab: data.lab
        ? { crn: data.lab.crn, seats: data.lab.seats, selected: true, additionalNotes: data.lab.additionalNotes }
        : undefined,
      tutorial: data.tutorial
        ? {
            crn: data.tutorial.crn,
            seats: data.tutorial.seats,
            selected: true,
            additionalNotes: data.tutorial.additionalNotes,
          }
        : undefined,
    });
  }, [data.lab, data.lecture, data.tutorial]);

  if (!course.selected) return null;

  return (
    <Skeleton
      isLoaded={!loading}
      color="black"
      mt="4"
      mb="2"
      boxShadow="md"
      px="3"
      py="1"
      rounded="lg"
      textAlign="left"
    >
      {isMinimized && (
        <RegistrationMinimized
          subject={course.subject}
          code={course.code}
          lecture={course.lecture}
          lab={course.lab}
          tutorial={course.tutorial}
          handleChange={handleMinimizedChange}
        />
      )}
      <Collapse in={!isMinimized} animateOpacity>
        <Heading size="lg" as="h2" textAlign="left">
          {course.subject} {course.code}
        </Heading>
        <VStack alignItems="left">
          {data.lecture && course.lecture && (
            <RegistrationSection
              section={course.lecture}
              seats={data.lecture.seats}
              crn={data.lecture.crn}
              selected={!data.lecture.selected}
              additionalNotes={data.lecture.additionalNotes}
              handleChange={handleChange}
            />
          )}
          {data.lab && course.lab && (
            <RegistrationSection
              section={course.lab}
              seats={data.lab.seats}
              crn={data.lab.crn}
              selected={!data.lab.selected}
              additionalNotes={data.lab.additionalNotes}
              handleChange={handleChange}
            />
          )}
          {data.tutorial && course.tutorial && (
            <RegistrationSection
              section={course.tutorial}
              seats={data.tutorial.seats}
              crn={data.tutorial.crn}
              selected={!data.tutorial.selected}
              additionalNotes={data.tutorial.additionalNotes}
              handleChange={handleChange}
            />
          )}
        </VStack>
      </Collapse>
    </Skeleton>
  );
}
