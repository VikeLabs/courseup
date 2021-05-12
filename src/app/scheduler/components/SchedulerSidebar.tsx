import { Flex } from '@chakra-ui/layout';

import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

export function SchedulerSidebar(): JSX.Element {
  const { courses, deleteCourse } = useSavedCourses();

  return (
    <Flex minW="25%" maxW="25%" grow={1} bg="#E4E4E4">
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Flex direction="column" overflowY="auto">
          {courses.map((course, key) => {
            return (
              <>
                <p key={key}>{JSON.stringify(course)}</p>
                <button
                  style={{
                    backgroundColor: 'red',
                  }}
                  onClick={() =>
                    deleteCourse({ code: course.code, pid: course.pid, subject: course.subject, term: course.term })
                  }
                >
                  {' '}
                  remove
                </button>
              </>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
