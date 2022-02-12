import { useEffect } from 'react';

import { Box, Container, Divider, Heading } from '@chakra-ui/layout';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { logEvent } from 'index';
import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';

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
    <Page title={`${getReadableTerm(term)} · Booklist`}>
      <VStack>
        <Box maxW={{ base: '35rem', md: '65rem' }} textAlign="center" pt="1.25rem">
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
            <>
              <Divider my="4" />
              <Container alignItems="center" maxW="container.xl">
                <Heading size="md" color={mode('gray', 'dark.header')}>
                  Unable to find saved courses or textbooks for{' '}
                  <Text as="span" color={mode('black', 'white')}>
                    {getReadableTerm(term)}
                  </Text>
                </Heading>
              </Container>
            </>
          )}
        </Box>
        {textbooks.status === 'loaded' && textbooks.textbookInfo.length > 0 && (
          <Box as="footer" px="2" textAlign={{ base: 'center', md: 'left' }}>
            <Text as="i">Amazon's trademark is used under license from Amazon.com, Inc. or its affiliates</Text>
          </Box>
        )}
      </VStack>
    </Page>
  );
}
