import { useEffect } from 'react';

import { Box, Flex } from '@chakra-ui/layout';
import { Button, Center, Container, Divider, Heading, Link, Spinner, Text } from '@chakra-ui/react';
import { logEvent } from 'index';
import { Helmet } from 'react-helmet';
import { HiOutlineCalendar } from 'react-icons/hi';
import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils/terms';

import { Header } from 'common/header';

import { BooklistHeading } from '../components/BooklistHeading';
import { TextbookCard } from '../components/TextbookCard';
import { useTextbooks } from '../hooks/useTextbooks';

export function BooklistContainer(): JSX.Element | null {
  const { term } = useParams();
  const mode = useDarkMode();
  const textbooks = useTextbooks(term as Term);

  useEffect(() => {
    logEvent('textbooks_view', { term });
  }, [term]);

  return (
    <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
      <Helmet>
        <title>{`${getReadableTerm(term)} · Booklist`}</title>
      </Helmet>
      <Header />
      <Flex width="100%" pt="1.25rem" direction="column" alignItems="center" overflowY="auto">
        <Box maxW={{ base: '35rem', md: '65rem' }} textAlign="center">
          <BooklistHeading />
          {textbooks.status === 'loading' ? (
            <Center height="100%" mt="10">
              <Spinner size="xl" />
            </Center>
          ) : textbooks.textbookInfo.filter((textbook) => textbook && textbook.term === term).length > 0 ? (
            textbooks.textbookInfo
              .filter((textbook) => textbook && textbook.term === term)
              .map(({ sections, subject, code }) => {
                return <TextbookCard subject={subject} code={code} sections={sections} />;
              })
          ) : (
            <Container maxW="container.xl" centerContent data-testid="courses-not-found">
              <Divider my="4" />
              <Box padding="10">
                <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
                  <Heading size="md" color={mode('gray', 'dark.header')}>
                    Unable to find saved textbooks from{' '}
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
          )}
        </Box>
        {textbooks.status === 'loaded' && textbooks.textbookInfo.length > 0 && (
          <Box as="footer" px="2" textAlign={{ base: 'center', md: 'left' }}>
            <Text as="i">Amazon's trademark is used under license from Amazon.com, Inc. or its affiliates</Text>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
