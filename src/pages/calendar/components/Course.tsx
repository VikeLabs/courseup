import { Box, Heading, Text } from '@chakra-ui/layout';
import { BackgroundProps, Divider, Flex } from '@chakra-ui/react';

import { HoursShield } from 'pages/calendar/components/Hours';
import { CourseHours } from 'pages/calendar/shared/types';

import { Shield } from './Shield';

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
  hours?: CourseHours[];
  /**
   * course credits (units)
   * example: 1.5
   */
  credits?: { credits: { max: string; min: string }; chosen: string; value: {} };
  /**
   * course additional notes
   */
  additionalNotes?: string;
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

export function CourseInfo({ description, hours, additionalNotes, credits, units }: CourseInfoProps): JSX.Element {
  return (
    <Box as="section">
      <Divider my="3" />
      <Flex my="3" flexWrap="wrap">
        {hours && <HoursShield hours={hours} />}
        {credits && (
          <Shield bg="purple.200" title="Credits">
            <Heading as="span" size="sm" title="credits given for this course">
              {credits.credits.max === credits.credits.min
                ? credits.credits.max
                : `${credits.credits.min} ~ ${credits.credits.max}`}
            </Heading>
          </Shield>
        )}
        {units && (
          <Shield bg="blue.200" title="Units">
            <Heading size="md" title="units given for this course">
              {units}
            </Heading>
          </Shield>
        )}
      </Flex>
      <Text as="article">{description}</Text>
      {additionalNotes && (
        <Box my="3">
          <Heading as="h4" size="md">
            Additional Notes
          </Heading>
          <Text>{additionalNotes}</Text>
        </Box>
      )}
    </Box>
  );
}
