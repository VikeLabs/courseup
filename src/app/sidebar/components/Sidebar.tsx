import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { Course, KualiSubject } from '../../../shared/fetchers';

import { CoursesList } from './CoursesList';
import { SubjectsList } from './SubjectsList';

export interface SidebarProps {
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

export function Sidebar({ subjects, courses }: SidebarProps): JSX.Element {
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const sortedSubjects = useMemo(() => subjects.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);

  const { term } = useParams();

  return (
    <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
      <Flex direction="column" overflowY="auto">
        <Routes>
          <Route path="/">
            <SubjectsList term={term} subjects={sortedSubjects} />
          </Route>
          <Route path=":subject">
            <CoursesList term={term} courses={parsedCourses} />
          </Route>
        </Routes>
      </Flex>
    </Flex>
  );
}
