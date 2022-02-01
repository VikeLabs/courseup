import { Container, Heading, Flex, Text } from '@chakra-ui/layout';
import { Button, Box } from '@chakra-ui/react';
import { HiExternalLink } from 'react-icons/hi';
import { useParams } from 'react-router';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils/terms';

export function RegistrationNotFound() {
  const { term } = useParams();
  const mode = useDarkMode();
  return (
    <Container maxW="container.xl" centerContent data-testid="registration-component-1">
      <Box padding="10">
        <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
          <Heading size="md" color={mode('gray', 'dark.header')}>
            Unable to find saved courses from{' '}
            <Text as="span" color={mode('black', 'white')}>
              {getReadableTerm(term)}&nbsp;
            </Text>
            timetable
            <Box padding="4">
              <Button
                colorScheme="blue"
                width="auto"
                leftIcon={<HiExternalLink />}
                as="a"
                href={`https://courseup.vikelabs.dev/scheduler/${term}`}
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
