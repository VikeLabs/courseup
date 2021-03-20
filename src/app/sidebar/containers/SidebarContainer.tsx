import { Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import { MouseEvent, useCallback } from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import { Term, useGetCourses, useSubjects } from '../../../fetchers';
import { Card } from '../components/Card';
import { Sidebar } from '../Sidebar';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = HitsProvided<CourseRecord> & {
  onSelectCourse: (pid: string) => void;
};

const SearchResults = ({ hits, onSelectCourse }: Props) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      if (pid) {
        onSelectCourse(pid);
      }
    },
    [onSelectCourse]
  );

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <Box onClick={handleClick} data-pid={pid} data-subject={subject} data-code={code} key={objectID}>
          <Card subject={subject} title={title} code={code} />
        </Box>
      ))}
    </>
  );
};

const CustomHits = connectHits<Props, CourseRecord>(SearchResults);

export interface SidebarContainerProps {
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
  /**
   * Current pid selected in content
   */
  pid?: string;
  /**
   * Sets pid for content -> displays course info in content component
   */
  setPid?: (pid: string) => void;

  searchQuery: string;
}

export function SidebarContainer({ term, pid, setPid, searchQuery }: SidebarContainerProps): JSX.Element | null {
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term });

  const handleSelectCourse = useCallback(
    (pid: string) => {
      setPid && setPid(pid);
    },
    [setPid]
  );

  if (searchQuery.length !== 0) {
    return (
      <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
        <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
          <Box>
            <HStack bg="white" py="2" px="4" top="0" m="0" boxShadow="md" zIndex={500}>
              <Heading pt="0.25em" color="black" size="sm">
                Search Results
              </Heading>
            </HStack>
          </Box>
          <Flex id="sideBarScroller" direction="column" overflowY="auto">
            <CustomHits onSelectCourse={handleSelectCourse} />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
      {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Spinner size="xl" />
      ) : (
        <Sidebar subjects={subjects} courses={courses} setPid={setPid} pid={pid} />
      )}
    </Flex>
  );
}
