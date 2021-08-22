import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

import { Header } from 'common/header';

import { BooklistHeading } from '../components/BooklistHeading';

import { CourseTextbooks, TextbookContainer } from './TextbookContainer';

const TEXTBOOK: CourseTextbooks = {
  subject: 'CYC',
  code: '152',
  section: 'B01',
  textbooks: [
    {
      bookstoreUrl: 'https://www.uvicbookstore.ca/text/book/9780134842486?course_id=117617',
      imageUrl: 'https://www.uvicbookstore.ca/images/textbook/9780134842486.jpg',
      title: 'Choices: Interviewing and Counselling Skills for Canadians',
      authors: ['Bob Smith', 'Smith Bob'],
      required: true,
      price: {
        newCad: '$99.99',
        usedCad: '$10.11',
      },
      isbn: '9780134842486',
    },
    {
      bookstoreUrl: 'https://www.uvicbookstore.ca/text/book/9780135222072?course_id=117617',
      imageUrl: 'https://www.uvicbookstore.ca/images/image_na_book.jpg',
      title: 'Choices:Interv+Couns.Skills Etext 180-da',
      authors: ['Bob Smith'],
      required: false,
      price: {
        newCad: '$99.99',
        usedCad: '$10.11',
      },
      isbn: '9780135222072',
    },
  ],
  additionalInfo: [
    'This course contains book(s) that come in multiple formats (E-Text, Physical, Loose, etc.). You only need one format of each book.',
  ],
  instructor: 'TO BE ADVISED',
};

export function BooklistContainer(): JSX.Element | null {
  const { term } = useParams();
  const { courses } = useSavedCourses();
  const mode = useDarkMode();

  return (
    <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
      <Helmet>
        <title>{`${getReadableTerm(term)} · Booklist`}</title>
      </Helmet>
      <Header />
      <Flex width="100%" pt="1.25rem" direction="column" alignItems="center" overflowY="auto">
        <Box maxW={{ base: '35rem', md: '65rem' }} textAlign="center">
          <BooklistHeading />
          {courses.filter((course) => course.term === term).length > 0 ? (
            courses
              .filter((course) => course.term === term)
              .map((course) => {
                return <TextbookContainer textbook={TEXTBOOK} />;
              })
          ) : (
            <>
              <Divider my="4" />
              <Container alignItems="center" maxW="container.xl">
                <Heading size="md" color={mode('gray', 'dark.header')}>
                  Unable to find saved courses for{' '}
                  <Text as="span" color={mode('black', 'white')}>
                    {getReadableTerm(term)}
                  </Text>
                </Heading>
              </Container>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
