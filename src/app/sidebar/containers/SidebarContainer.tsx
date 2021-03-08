import { Spinner } from '@chakra-ui/react';
import React from 'react';

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
  pid: string;
  /**
   * Sets pid for content -> displays course info in content component
   */
  setPid?: (pid: string) => void;
}

export function SidebarContainer({ term, pid, setPid }: SidebarContainerProps): JSX.Element | null {
  const { data: subjects, loading: subjectsLoading } = useSubjects({ term: term });
  const { data: courses, loading: coursesLoading } = useGetCourses({ term: term });

  if (subjectsLoading || coursesLoading) {
    return <Spinner />;
  }

  if (subjects !== null && courses !== null) {
    return <Sidebar subjects={subjects} courses={courses} setPid={setPid} pid={pid} />;
  }

  return null;
}
