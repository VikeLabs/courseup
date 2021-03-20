import { Box, Flex, Heading, HStack, Spinner } from '@chakra-ui/react';
import React from 'react';
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

const SearchResults: React.FC<Props> = ({ hits, onSelectCourse: onSelectUser }) => {
  return (
    <Box>
      {hits.map((hit) => (
        <Box onClick={() => onSelectUser(hit.pid)}>
          <Card key={hit.objectID} subject={hit.subject} title={hit.title} code={hit.code} />
        </Box>
      ))}
    </Box>
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
   * default is ''
   */
  pid?: string;
  /**
   * Sets pid for content -> displays course info in content component
   */
  setPid?: (pid: string) => void;
}

export function SidebarContainer({ term, pid, setPid }: SidebarContainerProps): JSX.Element | null {
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term });

  return (
    <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
      {/* {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Spinner size="xl" />
      ) : (
        <Sidebar subjects={subjects} courses={courses} setPid={setPid} pid={pid} />
      )} */}
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Box>
          <HStack bg="white" py="2" px="4" top="0" m="0" boxShadow="md" zIndex={500}>
            <Heading pt="0.25em" color="black" size="sm">
              Search Results
            </Heading>
          </HStack>
        </Box>
        <Flex id="sideBarScroller" direction="column" overflowY="auto">
          <CustomHits onSelectCourse={(e) => setPid && setPid(e)} />
        </Flex>
      </Flex>
    </Flex>
  );
}
