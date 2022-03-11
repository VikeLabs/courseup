import { useCallback } from 'react';

import { Box, VStack } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';

import { MeetingTimes } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { TopBar } from 'common/layouts/sidebar/components/TopBar';

import { useGetCourseSections } from '../hooks/useCalendarEvents';

import { CourseCard } from './CourseCard';
import { SectionsCardContainer } from './SchedulerSections';

// GREEN, RED, YELLOW, BLUE, PURPLE, ORANGE
export const COLORS = ['#32a852', '#b33127', '#e8e523', '#247fe0', '#971dcc', '#cc7d1d'];

interface SchedulerSidebarProps {
  term: string;
}

export function SchedulerSidebar({ term }: SchedulerSidebarProps): JSX.Element {
  const { deleteCourse, setSection, setShowSections, courses, setSelected, clearCourses } = useSavedCourses();
  const coursesResult = useGetCourseSections(term, courses);

  const handleCourseSectionChange = useCallback(
    (
      sectionType: string,
      sectionCode: string,
      meetingTimes: MeetingTimes[],
      code: string,
      subject: string,
      pid: string,
      term: string
    ) => {
      setSection(
        sectionType,
        {
          sectionCode,
          meetingTimes,
        },
        {
          code,
          subject,
          term,
          pid,
        }
      );
    },
    [setSection]
  );

  const handleCourseDelete = useCallback(
    ({ code, pid, subject, term }: { code: string; pid: string; subject: string; term: string }) => {
      deleteCourse({
        code,
        pid,
        subject,
        term,
      });
    },
    [deleteCourse]
  );

  const handleCourseToggle = useCallback(
    ({
      code,
      pid,
      subject,
      term,
      selected,
    }: {
      code: string;
      pid: string;
      subject: string;
      term: string;
      selected?: boolean;
    }) => {
      setSelected(!selected, {
        code,
        pid,
        subject,
        term,
      });
    },
    [setSelected]
  );

  const handleShowSections = useCallback(
    ({
      code,
      pid,
      subject,
      term,
      showSections,
    }: {
      code: string;
      pid: string;
      subject: string;
      term: string;
      showSections?: boolean;
    }) => {
      setShowSections(!showSections, {
        code,
        pid,
        subject,
        term,
      });
    },
    [setShowSections]
  );

  return (
    <>
      <TopBar
        colorScheme="red"
        onClick={() => clearCourses(term)}
        disabled={courses.filter((course) => course.term === term).length === 0}
        buttonName="Clear"
      >
        Saved Courses
      </TopBar>
      <Box h="100%" pb="20" overflowY="auto">
        {coursesResult.status === 'loaded' &&
          coursesResult.data
            .filter((course) => course.term === term)
            .map((course, key) => (
              <VStack key={key} mt="1" spacing="0">
                <CourseCard
                  term={course.term}
                  subject={course.subject}
                  code={course.code}
                  color={course.color}
                  pid={course.pid}
                  selected={course.selected}
                  showSections={course.showSections !== undefined ? course.showSections : true}
                  showSectionsToggle={course.sections.length > 0 ? true : false}
                  handleSelection={handleCourseToggle}
                  handleDelete={handleCourseDelete}
                  handleShowSections={handleShowSections}
                />
                <Collapse
                  // hacky way of addressing the fact that `showSections` was added as an attribute after users have already added courses to the timetable
                  in={course.showSections !== undefined ? course.showSections : true}
                  animateOpacity
                  style={{ width: '100%' }}
                >
                  <SectionsCardContainer
                    course={course}
                    courses={courses}
                    sections={course.sections}
                    handleChange={handleCourseSectionChange}
                  />
                </Collapse>
              </VStack>
            ))}
      </Box>
    </>
  );
}
