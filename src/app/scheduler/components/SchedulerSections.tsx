import { Radio, RadioGroup, Box, HStack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react';

import { ClassScheduleListing, MeetingTimes } from '../../../shared/fetchers';
import { Course } from '../../../shared/hooks/useSavedCourses';

export function SectionsCardContainer({
  course,
  courses,
  handleChange,
}: {
  course: Course;
  courses: Course[];
  handleChange: (
    sectionType: string,
    sectionCode: string,
    meetingTimes: MeetingTimes[],
    code: string,
    subject: string,
    pid: string,
    term: string
  ) => void;
}): JSX.Element {
  const { sections } = course;
  const sectionTypes = useMemo(() => Array.from(new Set(sections.map((s) => s.sectionType))), [sections]);

  return (
    <Box bg="whiteAlpha.900">
      {sectionTypes.map((type) => (
        <SectionGroup
          sections={sections}
          courses={courses}
          type={type}
          handleChange={handleChange}
          course={course}
          key={type}
        />
      ))}
    </Box>
  );
}

export interface SectionGroupProps {
  /**
   * Array of sections of a course
   */
  sections: ClassScheduleListing[];
  /**
   * type of section
   * example: Lecture, Tutorial, Lab etc.
   */
  type: string;
  course: Course;

  courses: Course[];

  handleChange: (
    sectionType: string,
    sectionCode: string,
    meetingTimes: MeetingTimes[],
    code: string,
    subject: string,
    pid: string,
    term: string
  ) => void;
}

export function SectionGroup({ sections, type, course, courses, handleChange }: SectionGroupProps): JSX.Element {
  const [section, setSection] = React.useState('');

  const filteredSections = useMemo(() => sections.filter((s) => s.sectionType === type), [sections, type]);

  useEffect(() => {
    courses.forEach((c) => {
      if (course.pid === c.pid && course.term === c.term) {
        if (type === 'lab' && c.lab) {
          setSection(c.lab.sectionCode);
        } else if (type === 'lecture' && c.lecture) {
          setSection(c.lecture.sectionCode);
        } else if (type === 'tutorial' && c.tutorial) {
          setSection(c.tutorial.sectionCode);
        }
      }
    });
  }, [course.pid, course.term, courses, type]);

  const onChange = useCallback(
    (newSection: string) => {
      setSection(newSection);
      const section = sections.find((section) => section.sectionCode === newSection);
      section &&
        handleChange(type, newSection, section.meetingTimes, course.code, course.subject, course.pid, course.term);
    },
    [course.code, course.pid, course.subject, course.term, handleChange, sections, type]
  );

  return (
    <RadioGroup onChange={onChange} value={section} name={type}>
      {filteredSections.map(({ sectionCode, meetingTimes }) => (
        <Option sectionCode={sectionCode} meetingTimes={meetingTimes} key={sectionCode} />
      ))}
    </RadioGroup>
  );
}

export interface OptionsProps {
  /**
   * Array of MeetingTimes, which hold meeting time like every monday at 12:30 pm
   * and also days and instructor info.
   */
  meetingTimes: MeetingTimes[];
  /**
   * section code
   * example: A01, B01, T01 etc.
   */
  sectionCode: string;
}

export function Option({ meetingTimes, sectionCode }: OptionsProps): JSX.Element {
  return (
    <>
      {meetingTimes.map((m, key) => (
        <HStack
          as="label"
          px="3"
          my="0.5"
          spacing="3"
          fontSize="12px"
          borderTop="#e4e4e4"
          borderTopWidth="2"
          borderTopStyle="solid"
          minH="50px"
          justifyContent="space-between"
          key={key}
        >
          <HStack>
            <Radio
              value={sectionCode}
              bgColor="white"
              // HACK: position: sticky needed to fix issue with button click jumping position on page
              position="sticky"
            />
            <Text as="strong">{sectionCode}</Text>
          </HStack>
          <Box minW="56px">
            {m.time.split('-').map((time) => (
              <Text key={time}>{time}</Text>
            ))}
          </Box>
          <Box minW="27px">{m.days}</Box>
          <Box>{m.where}</Box>
        </HStack>
      ))}
    </>
  );
}
