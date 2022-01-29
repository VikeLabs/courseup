import { useMemo } from 'react';

import 'react-big-calendar/lib/sass/styles.scss';

import { Box } from '@chakra-ui/layout';
import { useMatch } from 'react-router';

import { Timetable } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { SchedulerCalendar } from 'pages/scheduler/components/SchedulerCalendar';
import { useGetCourseSections } from 'pages/scheduler/hooks/useCalendarEvents';
import { denormalizeCourseEvents } from 'pages/scheduler/hooks/useTransformedCalendarEvents';

type Props = {
  timetable_courses: Timetable;
  saved_courses: SavedCourse[];
};

export const ImportCalendar = ({ timetable_courses, saved_courses }: Props): JSX.Element => {
  const comparePage = useMatch('/c/:slug');
  const { courses, term } = timetable_courses;

  const parsedCourses: SavedCourse[] = useMemo(
    () =>
      courses.map((course) => {
        return {
          subject: course.subject,
          pid: course.pid,
          code: course.code,
          term: term,
          lecture: course.lecture ? course.lecture[0] : undefined,
          lab: course.lab ? course.lab[0] : undefined,
          tutorial: course.tutorial ? course.tutorial[0] : undefined,
          color: course.color,
          selected: true,
        };
      }),
    [courses, term]
  );

  // extend the list of courses with section information
  const coursesResult = useGetCourseSections(term, parsedCourses);
  const savedResult = useGetCourseSections(term, saved_courses);

  // transform, filter etc. the users selected courses.
  const calendarEvents = useMemo(() => {
    const c = denormalizeCourseEvents(coursesResult.status === 'loaded' ? coursesResult.data : []);
    c.forEach((calendarEvent) => {
      calendarEvent.dashedBorder = comparePage ? true : false;
    });
    const s = denormalizeCourseEvents(savedResult.status === 'loaded' ? savedResult.data : []);
    s.forEach((calendarEvent) => {
      calendarEvent.dashedBorder = false;
    });
    //({ ...calendarEvent, dashedBorder: true })
    return [...c, ...s];
  }, [coursesResult, comparePage, savedResult]);

  return (
    <Box w="100%" h="500px" px="3" py="2">
      <SchedulerCalendar term={term} courseCalendarEvents={calendarEvents} />
    </Box>
  );
};
