import React, { useCallback, useEffect, useMemo } from 'react';

import { Radio, RadioGroup, Box, HStack, Text, VStack } from '@chakra-ui/react';

import { ClassScheduleListing, MeetingTimes } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

export function SectionsCardContainer({
  course,
  courses,
  sections,
  handleChange,
}: {
  course: SavedCourse;
  courses: SavedCourse[];
  sections: ClassScheduleListing[];
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
  const mode = useDarkMode();
  const sectionTypes = useMemo(() => Array.from(new Set(sections.map((s) => s.sectionType))), [sections]);

  return (
    <Box bgColor={mode('white', 'dark.main')}>
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
  course: SavedCourse;

  courses: SavedCourse[];

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
        if ((type === 'lab' || type === 'gradable lab') && c.lab) {
          setSection(c.lab);
        } else if ((type === 'lecture' || type === 'lecture topic') && c.lecture) {
          setSection(c.lecture);
        } else if (type === 'tutorial' && c.tutorial) {
          setSection(c.tutorial);
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
  const mode = useDarkMode();

  return (
    <HStack
      as="label"
      px="3"
      my="0.5"
      fontSize="12px"
      borderTop={mode('light.background', 'dark.background')}
      borderTopWidth="2"
      borderTopStyle="solid"
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
      <VStack flexGrow={1} py="1.5">
        {meetingTimes.map((m, key) => (
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
        ))}
      </VStack>
    </HStack>
  );
}
