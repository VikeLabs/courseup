import { Box, Collapse, Flex, SlideFade } from '@chakra-ui/react';
import React, { Dispatch, MouseEvent, SetStateAction, useCallback, useMemo, useState } from 'react';

import { SelectedCourse } from '../../App';
import { Course, KualiSubject } from '../../fetchers';

import { Card } from './components/Card';
import { TopBar } from './components/TopBar';

export interface SidebarProps {
  /**
   * All subjects for term selected in SidebarContainer from api
   */
  subjects: KualiSubject[];
  /**
   * All Courses for term selected in SidebarContainer from api
   */
  courses: Course[];

  selectedCourse?: SelectedCourse;
  setSelectedCourse: Dispatch<SetStateAction<SelectedCourse | undefined>>;
}

function computeParsedCourses(courses: Course[]) {
  return (
    courses.reduce((dict, course) => {
      const subject = course.subject;
      if (!(subject in dict)) {
        dict[subject] = [];
      }
      dict[subject].push(course);
      return dict;
    }, {} as { [subject: string]: Course[] }) ?? {}
  );
}

export function Sidebar({ subjects, courses, selectedCourse, setSelectedCourse }: SidebarProps): JSX.Element {
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const sortedSubjects = useMemo(() => subjects.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);

  const handleSubjectChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const subject = e.currentTarget.getAttribute('data-subject');
      setSelectedSubject(subject ?? undefined);
    },
    [setSelectedSubject]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      const subject = e.currentTarget.getAttribute('data-subject');
      const code = e.currentTarget.getAttribute('data-code');

      if (pid && subject && code) {
        setSelectedCourse({ pid, subject, code });
      }
    },
    [setSelectedCourse]
  );

  const handleTopBarBackClick = () => {
    setSelectedSubject(undefined);
  };

  return (
    <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
      <Box>
        <TopBar selectedSubject={selectedSubject} handleTopBarBackClick={handleTopBarBackClick} />
      </Box>

      <Flex id="sideBarScroller" direction="column" overflowY="auto">
        <Collapse in={selectedSubject === undefined} style={{ overflowY: 'scroll' }}>
          {sortedSubjects.map((subject, index) => (
            <Box data-subject={subject.subject} onClick={handleSubjectChange} key={index}>
              <Card subject={subject.subject} title={subject.title} />
            </Box>
          ))}
        </Collapse>

        <SlideFade in={selectedSubject !== undefined} offsetY="15em">
          {selectedSubject &&
            parsedCourses[selectedSubject].map(({ pid, code, subject, title }) => (
              <Box key={pid} data-pid={pid} data-code={code} data-subject={subject} onClick={handleClick}>
                <Card title={title} subject={subject} code={code} selected={pid === selectedCourse?.pid} />
              </Box>
            ))}
        </SlideFade>
      </Flex>
    </Flex>
  );
}
