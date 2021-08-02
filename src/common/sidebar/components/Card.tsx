import { PropsWithChildren, useCallback } from 'react';

import { ChevronRightIcon, AddIcon, InfoOutlineIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, IconButton } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

export interface CardProps {
  /**
   * The title of course
   * EX) Software Development Methods
   */
  title: string;

  colour?: string;

  /**
   * Subject to be displayed
   * EX) SENG 265 -> SENG
   */
  subject: string;

  /**
   * Pid of course
   */
  pid?: string;

  /**
   * Code to be displayed
   * EX) SENG 265 -> 265
   */
  code?: string;

  /**
   * Boolean to check Card is selected by user
   */
  selected?: boolean;

  /**
   * Boolean to check if in schedule mode
   */
  schedule?: boolean;
}

export function Card({ subject, title, code, selected, schedule, pid }: PropsWithChildren<CardProps>): JSX.Element {
  let { term } = useParams();
  const mode = useDarkMode();

  const { addCourse, deleteCourse, contains } = useSavedCourses();

  const courseIsSaved = pid && contains(pid, term);

  const handleBookmarkClick = useCallback(() => {
    if (code && pid) {
      if (!courseIsSaved) {
        addCourse(term, subject, code, pid);
      } else {
        deleteCourse({
          subject,
          code,
          pid,
          term,
        });
      }
    }
  }, [code, pid, courseIsSaved, addCourse, subject, term, deleteCourse]);

  const buttons = (code: string | undefined, schedule: boolean | undefined) => {
    if (!code) {
      return (
        <Box>
          <IconButton
            aria-label="Select course"
            icon={<ChevronRightIcon />}
            size="md"
            background="null"
            _hover={{ bg: 'none' }}
          />
        </Box>
      );
    } else if (code && schedule) {
      return (
        <VStack paddingLeft="0.1em">
          <IconButton
            aria-label="Add to Scheduler"
            onClick={handleBookmarkClick}
            icon={courseIsSaved ? <CloseIcon /> : <AddIcon />}
            size="xs"
            colorScheme={courseIsSaved ? 'red' : 'green'}
          />
          <IconButton
            aria-label="More information"
            icon={<InfoOutlineIcon />}
            size="xs"
            colorScheme="blue"
            as={Link}
            to={`/calendar/${term}/${subject}?pid=${pid}`}
          />
        </VStack>
      );
    }
  };
  return (
    <Box
      bgColor={mode('white', 'dark.main')}
      bgGradient={selected ? 'linear(to-l, #2e95d1, #7cbce2)' : undefined}
      boxShadow="md"
      py={2}
      px={4}
      my={1}
      cursor={!schedule ? 'pointer' : 'auto'}
      _hover={{
        bgGradient: schedule ? undefined : selected ? undefined : 'linear(to-l, #39c686, #80dbb1)',
        color: schedule ? undefined : 'black',
      }}
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <VStack alignItems="start" spacing="0">
          <Text fontSize="lg" fontWeight="bold" p={0} m={0}>
            {subject} {code}
          </Text>
          <Text fontSize="sm" fontWeight="normal" p={0} m={0}>
            {title}
          </Text>
        </VStack>
        {buttons(code, schedule)}
      </Flex>
    </Box>
  );
}
