import { useState } from 'react';

import { Box, Heading, Text } from '@chakra-ui/layout';
import { BackgroundProps, Button, Center, Divider, Flex } from '@chakra-ui/react';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';

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
   * course addtional notes
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
  const smallScreen = useSmallScreen();
  const [fullDesc, setFullDesc] = useState(false);

  const handleClick = () => {
    setFullDesc(!fullDesc);
  };

  return (
    <Box as="section" p={{ base: 2, md: 0 }}>
      <Divider my="3" />
      <Flex my="3" flexWrap="wrap" w={{ base: '100%', sm: '' }} justifyContent={{ base: 'center', md: 'left' }}>
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
      <Text as="article" isTruncated={smallScreen && !fullDesc}>
        {description}
      </Text>
      {smallScreen && (
        <Center>
          <Button onClick={handleClick} variant="link" colorScheme="blue" size="sm">
            {fullDesc ? 'Show less' : 'Read more'}
          </Button>
        </Center>
      )}
      {additionalNotes && (
        <Box my="3">
          <Heading as="h4" size="md">
            Additional Notes
          </Heading>
          <Text>{additionalNotes}</Text>
        </Box>
      )}
      <Divider my="5" />
    </Box>
  );
}
