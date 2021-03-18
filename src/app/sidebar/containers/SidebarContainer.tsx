import { Flex, Spinner } from '@chakra-ui/react';

import { Term, useGetCourses, useSubjects } from '../../../fetchers';
import { Sidebar } from '../Sidebar';

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
  /**
   * Sets subject for content -> displays course info in content component
   */
  setSubject?: (currentSubject: string) => void;
  /**
   * Sets code for content -> displays course info in content component
   */
  setCode?: (currentSubject: string) => void;
}

export function SidebarContainer({
  term,
  pid,
  setPid,
  setSubject,
  setCode,
}: SidebarContainerProps): JSX.Element | null {
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term });

  return (
    <Flex justifyContent="center" alignItems="center" bg="#E4E4E4" minW="20%">
      {subjectsLoading || coursesLoading || subjects === null || courses === null ? (
        <Spinner size="xl" />
      ) : (
        <Sidebar
          subjects={subjects}
          courses={courses}
          setPid={setPid}
          pid={pid}
          setSubject={setSubject}
          setCode={setCode}
        />
      )}
    </Flex>
  );
}
