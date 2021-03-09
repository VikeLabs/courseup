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

function scrollToTop() {
  const sideBarScroller = document.querySelector('#sideBarScroller');
  if (sideBarScroller) sideBarScroller.scrollTop = 0;
}

export function Sidebar({ pid, setPid, subjects, courses }: SidebarProps): JSX.Element {
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const handleSubjectChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const subject = e.currentTarget.getAttribute('data-subject');
      setSelectedSubject(subject ?? undefined);
      scrollToTop();
    },
    [setSelectedSubject]
  );

  const handlePidChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      setPid && setPid(pid ?? '');
    },
    [setPid]
  );

  const handleTopBarBackClick = () => {
    setSelectedSubject(undefined);
    scrollToTop();
  };

  return (
    <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
      <TopBar selectedSubject={selectedSubject} handleTopBarBackClick={handleTopBarBackClick} />

      <Flex id="sideBarScroller" direction="column" overflowY="auto">
        <Collapse in={selectedSubject === undefined} style={{ overflowY: 'scroll' }}>
          {subjects.map((subject, index) => (
            <Box data-subject={subject.subject} onClick={handleSubjectChange}>
              <Card key={index} subject={subject.subject} title={subject.title} />
            </Box>
          ))}
        </Collapse>

        <SlideFade in={selectedSubject !== undefined} offsetY="15em">
          {selectedSubject &&
            parsedCourses[selectedSubject].map((course) => (
              <Box data-pid={course.pid} onClick={handlePidChange}>
                <Card title={course.title} subject={course.subject} code={course.code} selected={course.pid === pid} />
              </Box>
            ))}
        </SlideFade>
      </Flex>
    </Flex>
  );
}
