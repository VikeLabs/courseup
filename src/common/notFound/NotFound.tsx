import { PropsWithChildren } from 'react';

import { Container, Heading, Flex, Text } from '@chakra-ui/layout';
import { Button, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { HiOutlineCalendar } from 'react-icons/hi';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils/terms';

type Props = {
  term: string;
  timetable?: boolean;
};

export function NotFound({ children, term, timetable }: PropsWithChildren<Props>) {
  const mode = useDarkMode();
  return (
    <Container maxW="container.xl" centerContent data-testid="courses-not-found">
      <Box padding="2">
        <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
          <Heading size="md" color={mode('gray', 'dark.header')}>
            {children + ' '}
            <Text as="span" color={mode('black', 'white')}>
              {getReadableTerm(term)}
            </Text>
            <Box padding="4">
              {timetable && (
                <Button
                  colorScheme="blue"
                  width="auto"
                  leftIcon={<HiOutlineCalendar />}
                  as={Link}
                  href={`/scheduler/${term}`}
                >
                  {`${getReadableTerm(term)}`} Timetable
                </Button>
              )}
            </Box>
          </Heading>
        </Flex>
      </Box>
    </Container>
  );
}
