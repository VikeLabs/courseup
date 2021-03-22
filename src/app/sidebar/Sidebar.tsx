import { Box, Collapse, Flex, SlideFade } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';

import { Course, KualiSubject } from '../../fetchers';

import { Card } from './components/Card';
import { TopBar } from './components/TopBar';

export interface SidebarProps {
  /**
   * Sets pid for content -> displays course info in content component
   */
  setPid?: (pid: string) => void;
  /**
   * Current pid selected in content
   * default is ''
   */
  pid?: string;
  /**
   * All subjects for term selected in SidebarContainer from api
   */
  subjects: KualiSubject[];
  /**
   * All Courses for term selected in SidebarContainer from api
   */
  courses: Course[];
  /**
   * Sets subject for content -> displays course info in content component
   */
  setSubject?: (currentSubject: string) => void;
  /**
   * Sets code for content -> displays course info in content component
   */
  setCode?: (currentSubject: string) => void;
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

export function Sidebar({ pid, setPid, subjects, courses, setSubject, setCode }: SidebarProps): JSX.Element {
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const sortedSubjects = useMemo(() => subjects.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);

  const handleSubjectChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const subject = e.currentTarget.getAttribute('data-subject');
      setSelectedSubject(subject ?? undefined);
      setSubject && setSubject(subject ?? '');
    },
    [setSelectedSubject]
  );

  const handlePidCodeChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      setPid && setPid(pid ?? '');
      const code = e.currentTarget.getAttribute('data-code');
      setCode && setCode(code ?? '');
    },
    [setPid]
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
            parsedCourses[selectedSubject].map((course) => (
              <Box key={course.pid} data-pid={course.pid} data-code={course.code} onClick={handlePidCodeChange}>
                <Card title={course.title} subject={course.subject} code={course.code} selected={course.pid === pid} />
              </Box>
            ))}
        </SlideFade>
      </Flex>
    </Flex>
  );
}
