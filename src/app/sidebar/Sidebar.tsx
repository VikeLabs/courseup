import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { Course, KualiSubject } from '../../fetchers';

import { Card } from './components/Card';
import { TopBar } from './components/TopBar';

export interface SidebarProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  setPid?: (pid: string) => void;
  pid: string;
  subjects: KualiSubject[];
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

export function Sidebar({ pid, setPid, subjects, courses }: SidebarProps): JSX.Element {
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);

  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const handleSubjectChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const subject = e.currentTarget.getAttribute('data-subject');
      setSelectedSubject(subject ?? undefined);
      window.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    document.querySelector('.courses')?.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(document.querySelector('.courses'));
  };

  return (
    <Flex
      maxH="100vh"
      bg="#E4E4E4"
      overflow="hidden"
      direction="column"
      justifyContent="flex-start"
      minW="20%"
      maxW="20%"
    >
      <TopBar selectedSubject={selectedSubject} handleTopBarBackClick={handleTopBarBackClick} />

      <Flex class="courses" direction="column" overflowY="scroll">
        {!selectedSubject &&
          subjects.map((subject, index) => (
            <Box data-subject={subject.subject} onClick={handleSubjectChange}>
              <Card key={index} subject={subject.subject} title={subject.title} />
            </Box>
          ))}

        {selectedSubject &&
          parsedCourses[selectedSubject].map((course) => (
            <Box data-pid={course.pid} onClick={handlePidChange}>
              <Card title={course.title} subject={course.subject} code={course.code} selected={course.pid === pid} />
            </Box>
          ))}
      </Flex>
    </Flex>
  );
}
