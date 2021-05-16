import { Radio, RadioGroup, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';

import { ClassScheduleListing, MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { SectionListData } from '../../../shared/hooks/useSectionList';

export function SectionsCardContainer({
  course,
  handleChange,
}: {
  course: SectionListData;
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
  const sectionTypes = sections.map((s) => s.sectionType).filter((item, pos, self) => self.indexOf(item) === pos);

  return (
    <Table size="sm" bg="white">
      <Tbody>
        {sectionTypes.map((type) => (
          <SectionGroup sections={sections} type={type} handleChange={handleChange} course={course} />
        ))}
      </Tbody>
    </Table>
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
  course: SectionListData;
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

export function SectionGroup({ sections, type, course, handleChange }: SectionGroupProps): JSX.Element {
  const [section, setSection] = React.useState('');
  const { sectionIsSaved, courses } = useSavedCourses();

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
      console.log(newSection);
      setSection(newSection);
      const section = sections.find((section) => section.sectionCode === newSection);
      section &&
        handleChange(type, newSection, section.meetingTimes, course.code, course.subject, course.pid, course.term);
    },
    [course.code, course.pid, course.subject, course.term, handleChange, sections, type]
  );

  return (
    <RadioGroup onChange={onChange} value={section} name={type}>
      {sections
        .filter((s) => s.sectionType === type)
        .map(({ sectionCode, meetingTimes }) => {
          console.log(sectionIsSaved(course.pid, course.term, sectionCode), sectionCode);
          return (
            <Option
              sectionCode={sectionCode}
              meetingTimes={meetingTimes}
              isChecked={sectionIsSaved(course.pid, course.term, sectionCode)}
            />
          );
        })}
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
  isChecked: boolean;
}

export function Option({ meetingTimes, sectionCode, isChecked }: OptionsProps): JSX.Element {
  console.log(sectionCode, isChecked);
  return (
    <>
      {meetingTimes.map((m) => (
        <Tr>
          <Td>
            <Radio value={sectionCode} defaultChecked={isChecked} />
          </Td>
          <Td fontWeight="bold"> {sectionCode} </Td>
          <Td>{m.days}</Td>
          <Td>{m.time}</Td>
          <Td>{m.where}</Td>
        </Tr>
      ))}
    </>
  );
}
