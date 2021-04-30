import { Box, Heading, Text, Spacer } from '@chakra-ui/layout';
import { BackgroundProps, Divider, Flex } from '@chakra-ui/react';
import { PropsWithChildren, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CourseDetails } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/storage/useSavedCourses';

export interface CourseShieldProps {
  /**
   * Title for the shield
   */
  title: string;
  /**
   * bg Chakra-UI prop
   */
  bg?: BackgroundProps['bg'];
}

export function CourseShield({ title, children, bg }: PropsWithChildren<CourseShieldProps>): JSX.Element {
  return (
    <Flex m="1">
      <Box bg="gray.100" p="1" borderTopLeftRadius="md" borderBottomLeftRadius="md">
        <Heading size="md" color="gray.600" px="3">
          {title}
        </Heading>
      </Box>
      <Flex bg={bg} p="1" px="3" borderBottomRightRadius="md" borderTopRightRadius="md">
        {children}
      </Flex>
    </Flex>
  );
}

export interface CourseInfoProps {
  /**
   * course subject
   * example: CSC
   */
  subject: string;
  /**
   * course code
   * example: 111
   */
  code: string;
  /**
   * course title
   * example: Foundations of Computer Science
   */
  title: string;
  /**
   * course description
   */
  description: string;
  /**
   * course weekly hour distribution
   */
  hours?: { lecture: string; tutorial: string; lab: string };
  /**
   * course credits (units)
   * example: 1.5
   */
  credits?: { credits: { max: string; min: string }; chosen: string; value: {} };
  /**
   * course addtional notes
   */
  addtionalNotes?: string;
  /**
   * course units
   */
  units?: string;
  /**
   * pid of the course
   */
  pid: string;
  /**
   * current term
   */
  term: string;
}

export function CourseInfo({
  subject,
  code,
  title,
  description,
  hours,
  addtionalNotes,
  credits,
  units,
  pid,
  term,
}: CourseInfoProps): JSX.Element {
  const { courses, addCourse, deleteCourse, contains } = useSavedCourses();

  const courseIsSaved = contains(pid, term);

  const handleBookmarkClick = useCallback(() => {
    if (!courseIsSaved) {
      addCourse({ subject, code, pid, term });
    } else {
      deleteCourse(pid, term);
    }
  }, [addCourse, code, courseIsSaved, deleteCourse, pid, subject, term]);

  return (
    <Box as="section" bg="white" color="black">
      <Divider my="3" />
      <Flex my="3" flexWrap="wrap">
        {hours && (
          <CourseShield bg="green.200" title="Hours">
            <Heading size="md" title="lecture hours per week">
              {hours.lecture}
            </Heading>
            {'-'}
            <Heading size="md" title="lab hours per week">
              {hours.lab}
            </Heading>
            {'-'}
            <Heading size="md" title="tutorial hours per week">
              {hours.tutorial}
            </Heading>
          </CourseShield>
        )}
        {credits && (
          <CourseShield bg="purple.200" title="Credits">
            <Heading size="md" title="lecture hours per week">
              {credits.credits.max === credits.credits.min
                ? credits.credits.max
                : `${credits.credits.min} ~ ${credits.credits.max}`}
            </Heading>
          </CourseShield>
        )}
        {units && (
          <CourseShield bg="blue.200" title="Units">
            <Heading size="md" title="units given for this course">
              {units}
            </Heading>
          </CourseShield>
        )}
        <Spacer />
        <Flex justify="right" align="right" borderBottomRightRadius="md" borderTopRightRadius="md">
          <button onClick={handleBookmarkClick} style={{ backgroundColor: courseIsSaved ? 'red' : 'lightgreen' }}>
            {courseIsSaved ? 'Remove' : 'Add'}
          </button>
        </Flex>
      </Flex>
      <Text as="article">{description}</Text>
      {addtionalNotes && (
        <Box my="3">
          <Heading as="h4" size="md">
            Addtional Notes
          </Heading>
          <Text>{addtionalNotes}</Text>
        </Box>
      )}
      <Divider my="5" />
    </Box>
  );
}
