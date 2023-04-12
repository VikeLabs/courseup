import { Wrap, WrapItem } from '@chakra-ui/react';

import { Term, TimetableCourse } from 'lib/fetchers';

import { NotFound } from 'common/notFound/NotFound';

import { ShareCourseCard } from 'pages/scheduler/components/share/SelectedCoursesCardList';

export function TimetableCourseTags({ courses, term }: { courses: TimetableCourse[]; term: Term }) {
  return (
    <Wrap p={5} justify="center">
      {courses.length > 0 ? (
        courses.map((course) => {
          if (course.lecture || course.lab || course.tutorial) {
            return (
              <WrapItem key={`${course.subject}${course.code}`}>
                <ShareCourseCard
                  lecture={course.lecture && course.lecture[0]}
                  lab={course.lab && course.lab[0]}
                  tutorial={course.tutorial && course.tutorial[0]}
                  term={term}
                  subject={course.subject}
                  pid={course.pid}
                  code={course.code}
                  color={course.color}
                />
              </WrapItem>
            );
          }
          return null;
        })
      ) : (
        <NotFound term={term}> Unable to find saved courses for</NotFound>
      )}
    </Wrap>
  );
}
