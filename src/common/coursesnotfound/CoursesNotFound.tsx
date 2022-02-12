import { Container, Heading, Flex, Text, Divider } from '@chakra-ui/layout';
import { Button, Box } from '@chakra-ui/react';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils/terms';

export function CoursesNotFound() {
  const { term } = useParams();
  const mode = useDarkMode();
  return (
    <Container maxW="container.xl" centerContent data-testid="courses-not-found">
      <Divider my="4" />
      <Box padding="10">
        <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
          <Heading size="md" color={mode('gray', 'dark.header')}>
            Unable to find saved courses from{' '}
            <Text as="span" color={mode('black', 'white')}>
              {getReadableTerm(term)}{' '}
            </Text>
            timetable
            <Box padding="4">
              <Button
                colorScheme="blue"
                width="auto"
                leftIcon={<HiOutlineCalendar />}
                as={Link}
                to={`/scheduler/${term}`}
              >
                {`${getReadableTerm(term)}`} timetable
              </Button>
            </Box>
          </Heading>
        </Flex>
      </Box>
    </Container>
  );
}
