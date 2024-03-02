import React, { useCallback, useEffect, useMemo } from 'react';

import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Radio, RadioGroup, Box, HStack, Text, VStack, Tooltip, forwardRef, Badge, Flex } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';

import { MeetingTimes, Section } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import Location from 'common/location/Location';

import { fuzzySearchBuilding, fuzzySearchCache } from '../../../lib/utils/constants';

export function SectionsCardContainer({
  course,
  courses,
  sections,
  handleChange,
}: {
  course: SavedCourse;
  courses: SavedCourse[];
  sections: Section[];
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
  sections: Section[];
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
      {filteredSections.map(({ sectionCode, meetingTimes, additionalNotes, seats }) => (
        <Option
          {...{
            sectionCode,
            meetingTimes,
            additionalNotes,
            seats: seats,
            key: sectionCode,
          }}
        />
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
  /**
   * Additional info like section restrictions, etc
   */
  additionalNotes?: string;

  seats: Section['seats'];
}

export const Option = forwardRef<OptionsProps, 'div'>(function Option(
  { meetingTimes, sectionCode, additionalNotes, seats }: OptionsProps,
  ref
): JSX.Element {
  const mode = useDarkMode();

  additionalNotes = additionalNotes
    ?.trim()
    ?.replace(
      /^For a description of this course, and to check for prerequisites and mutually exclusive \(MX\) courses, see the Calendar\./,
      ''
    )
    ?.trim()
    ?.replace(/^Section information text:/, '')
    ?.trim()
    ?.replace(/^(.{200}).+/, '$1…');

  const sectionFull = (seats?.enrollment ?? 0) >= (seats?.maxEnrollment ?? 0);
  const waitlistFull = (seats?.waitCount ?? 0) >= (seats?.waitCapacity ?? 0);

  function Time({ time }: { time: string }) {
    const [start, end] = time.split('-');
    return (
      <HStack spacing={'1'}>
        <TimeIcon />
        <Flex flexDirection={'row'}>
          <Text display={'inline-block'} whiteSpace={'nowrap'}>
            {start}
          </Text>
          <Text>-</Text>
          <Text display={'inline-block'} whiteSpace={'nowrap'}>
            {end}
          </Text>
        </Flex>
      </HStack>
    );
  }

  return (
    <Tooltip label={additionalNotes} isDisabled={!additionalNotes} placement="left">
      <HStack
        as="label"
        px="3"
        my="0.5"
        fontSize="12px"
        borderTop={mode('light.background', 'dark.background')}
        borderTopWidth="medium"
        borderTopStyle="solid"
      >
        <HStack ref={ref}>
          <Radio
            value={sectionCode}
            bgColor="white"
            // HACK: position: sticky needed to fix issue with button click jumping position on page
            position="sticky"
          />
        </HStack>
        <VStack w="100%" alignItems="left" spacing="2" py="1.5">
          <Text as="strong">{sectionCode}</Text>
          {meetingTimes.map((m, key) => {
            let locationAbbreviation = '';
            if (m.buildingAbbreviation) {
              locationAbbreviation = `${m.buildingAbbreviation} ${m.roomNumber}`;
            } else {
              if (fuzzySearchCache[m.where]) {
                locationAbbreviation = `${fuzzySearchCache[m.where]} ${m.roomNumber}`;
              } else {
                locationAbbreviation = `${fuzzySearchBuilding(m.where, fuzzySearchCache)} ${m.roomNumber}`;
              }
            }
            return (
              <Flex key={key} gap={2} flexDirection="row" flexWrap="wrap">
                <HStack spacing={1}>
                  <CalendarIcon />
                  <Text>{m.days}</Text>
                </HStack>
                <Time time={m.time} />
                {locationAbbreviation && (
                  <HStack spacing={1}>
                    <FaMapMarkerAlt />
                    <Location alwaysShort short={locationAbbreviation} long={m.where} />
                  </HStack>
                )}
              </Flex>
            );
          })}
          {seats && (
            <HStack>
              <FaUser />
              <HStack spacing={1}>
                <Text>Seats</Text>
                <Badge as="b" colorScheme={sectionFull ? 'red' : 'green'}>
                  {seats.enrollment}/{seats.maxEnrollment}
                </Badge>
              </HStack>
              {seats.waitCapacity && (
                <HStack spacing={1}>
                  <Text>Waitlist</Text>
                  <Badge as="b" colorScheme={waitlistFull ? 'red' : 'green'}>
                    {seats.waitCount}/{seats.waitCapacity}
                  </Badge>
                </HStack>
              )}
            </HStack>
          )}
        </VStack>
      </HStack>
    </Tooltip>
  );
});
