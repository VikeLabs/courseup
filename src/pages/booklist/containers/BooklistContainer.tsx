import { useEffect } from 'react';

import { Box } from '@chakra-ui/layout';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { logEvent } from 'lib/utils/logEvent';
import { getReadableTerm } from 'lib/utils/terms';

import { Page } from 'common/layouts/Page';
import { NotFound } from 'common/notfound/NotFound';

import { BooklistHeading } from '../components/BooklistHeading';
import { TextbookCard } from '../components/TextbookCard';
import { useTextbooks } from '../hooks/useTextbooks';

export function BooklistContainer(): JSX.Element | null {
  const { term } = useParams();
  const textbooks = useTextbooks(term as Term);
  useEffect(() => {
    logEvent('textbooks_view', { term });
  }, [term]);

  // to avoid erroring out if term is not provided in URL
  // term is eventually filled in but need to avoid initial error
  if (!term)
    return (
      <Page title="Loading booklist..." mobileSupport>
        <Center height="100%" mt="10">
          <Spinner size="xl" />
        </Center>
      </Page>
    );

  return (
    <Page title={`${getReadableTerm(term)} · Booklist`} mobileSupport>
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
          ) : textbooks.textbookInfo.filter((textbook) => textbook && textbook.term === term).length <= 0 &&
            textbooks.textbookInfo.length <= 0 ? (
            <NotFound item="Unable to find saved courses from your" term={term} timetableButton timetable />
          ) : (
            <NotFound
              item="No textbooks found for your saved courses in"
              term={term}
              timetableButton={false}
              timetable={false}
            />
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
