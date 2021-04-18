import { Collapse, Flex, LinkBox, SlideFade } from '@chakra-ui/react';
import { MouseEvent, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SelectedCourse } from '../../../pages/calendar';
import { Course, KualiSubject } from '../../../shared/fetchers';

import { Card } from './Card';

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
  const parsedCourses = useMemo(() => computeParsedCourses(courses), [courses]);
  const sortedSubjects = useMemo(() => subjects.sort((a, b) => (a.subject > b.subject ? 1 : -1)), [subjects]);

  const { term } = useParams();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      const subject = e.currentTarget.getAttribute('data-subject');
      const code = e.currentTarget.getAttribute('data-code');
      const title = e.currentTarget.getAttribute('data-title');

      if (pid && subject && code && title) {
        setSelectedCourse({ title });
      }
    },
    [setSelectedCourse]
  );

  return (
    <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
      <Flex direction="column" overflowY="auto">
        {/* Subjects */}
        <Collapse in={selectedSubject === undefined} style={{ overflowY: 'scroll' }}>
          {sortedSubjects.map((subject, index) => (
            <LinkBox as={Link} to={`/calendar/${term}/${subject.subject}`} data-subject={subject.subject} key={index}>
              <Card subject={subject.subject} title={subject.title} />
            </LinkBox>
          ))}
        </Collapse>
        {/* Courses */}
        <SlideFade in={!!selectedSubject}>
          {selectedSubject &&
            parsedCourses[selectedSubject] &&
            parsedCourses[selectedSubject].map(({ pid, code, subject, title }) => (
              <LinkBox
                key={pid}
                as={Link}
                to={`/calendar/${term}/${subject}/${code}?pid=${pid}`}
                onClick={handleClick}
                data-title={title}
              >
                <Card title={title} subject={subject} code={code} />
              </LinkBox>
            ))}
        </SlideFade>
      </Flex>
    </Flex>
  );
}
