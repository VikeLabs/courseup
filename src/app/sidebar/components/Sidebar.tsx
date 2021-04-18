import { Collapse, Flex, LinkBox, SlideFade } from '@chakra-ui/react';
import { MouseEvent, useCallback, useMemo } from 'react';
import { Link, Routes, useParams } from 'react-router-dom';

import { SelectedCourse } from '../../../pages/calendar';
import { Course, KualiSubject } from '../../../shared/fetchers';

import { Card } from './Card';
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

  selectedCourse?: SelectedCourse;
  onSelectedCourseChange: (selectedCourse?: SelectedCourse) => void;

  selectedSubject?: string;
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

export function Sidebar({
  subjects,
  courses,
  onSelectedCourseChange: setSelectedCourse,
  selectedSubject,
}: SidebarProps): JSX.Element {
  //
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const sortedSubjects = useMemo(() => subjects.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);

  const { term } = useParams();

  return (
    <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
      <Flex direction="column" overflowY="auto">
        {/* Subjects */}
        <SubjectsList term={term} subjects={sortedSubjects} />
        {/* Courses */}
        {/* <CoursesList term={term} courses={selectedSubject ? parsedCourses[selectedSubject] : courses} /> */}
      </Flex>
    </Flex>
  );
}
