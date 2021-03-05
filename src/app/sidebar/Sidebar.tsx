import { Box, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';

import { Course, Term, useGetCourses, useSubjects } from '../../fetchers';

import { Card } from './components/Card';
import { CardDropDown } from './components/CardDropDown';

export interface SidebarProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  setPid?: (pid: string) => void;
  pid: string;
}

export function Sidebar({ term, pid, setPid }: SidebarProps): JSX.Element {
  const { data: subjects } = useSubjects({ term: term });
  const { data: courses } = useGetCourses({ term: term });

  const parsedCourses =
    courses?.reduce((dict, course) => {
      const subject = course.subject;
      if (!(subject in dict)) {
        dict[subject] = [];
      }
      dict[subject].push(course);
      return dict;
    }, {} as { [subject: string]: Course[] }) ?? {};

  const handleClick = useCallback(
    (pid: string) => {
      setPid && setPid(pid);
    },
    [setPid]
  );

  return (
    <Box>
      <Box>{/* <Heading>Search</Heading> */}</Box>
      <Flex id="scrollableFlex" maxH="100vh" bg="#E4E4E4" p="2" overflow="auto" direction="column">
        {subjects?.map((subject, index) => (
          <CardDropDown key={index} subject={subject.subject} title={subject.title}>
            {parsedCourses[subject.subject]?.map((course, index) => (
              <Card
                selected={course.pid === pid}
                key={course.pid}
                title={course.title}
                code={course.code}
                subject={course.subject}
                onClick={() => handleClick(course.pid)}
              />
            ))}
          </CardDropDown>
        ))}
        {/* </InfiniteScroll> */}
      </Flex>
    </Box>
  );
}
