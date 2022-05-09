import { InfoIcon } from '@chakra-ui/icons';
import { Container, Box, Heading, Text } from '@chakra-ui/layout';
import { Flex, HStack, VStack } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { TextbookInfo } from '../api/getCourseTextbooks';
import { Textbook as TextbookType } from '../shared/types';

import { Textbook } from './Textbook';

type Props = Omit<TextbookInfo, 'term'> & {
  key: string;
};

export type CourseTextbooks = {
  subject: string;
  code: string;
  section: string;
  additionalInfo?: string[];
  instructor?: string;
  textbooks: TextbookType[];
};

export function TextbookCard({ subject, code, sections }: Props) {
  const mode = useDarkMode();


  return (
    <Container
      key={`${subject}-${code}`}
      alignItems="center"
      maxW="container.xl"
      bgColor={mode('white', 'dark.background')}
      rounded="lg"
      mt="10px"
      mb="2"
      boxShadow="md"
      p="4"
      textAlign="left"
    >
      {sections.map(({ section, instructor, textbooks, additionalInfo }) => (
        <Box key={`${subject}-${code}-${section}`}>
          <Heading size="lg">
            {subject} {code}
          </Heading>
          <HStack justifyContent="space-between" pb="4">
            <Heading size="md" color={mode('gray', 'dark.header')}>
              {section}
            </Heading>
            <Heading size="md" color={mode('gray', 'dark.header')}>
              {instructor}
            </Heading>
          </HStack>
          {additionalInfo && additionalInfo.length > 0 ? (
            <Box pb="4">
              {additionalInfo?.map((info) => (
                <HStack
                  key={`${subject}-${code}-${section}-${info}`}
                  bgColor={mode('blue.200', 'blue.800')}
                  py="2"
                  pl="2"
                  my="1"
                  borderRadius="md"
                >
                  <InfoIcon mx="1" />
                  <Text px="1">{info}</Text>
                </HStack>
              ))}
            </Box>
          ) : null}
          <Flex
            alignItems="center"
            direction={{ base: 'column', md: 'row' }}
            p="4"
            backgroundColor={mode('gray.50', 'gray.800')}
            borderRadius="lg"
          >
            <VStack w="100%" alignItems="left" gap="1em">
              {textbooks.map(({ title, authors, price, isbn, bookstoreUrl, imageUrl, required, amazonUrl }) => (
                <Textbook
                  key={`${isbn}`}
                  title={title}
                  authors={authors}
                  price={price}
                  isbn={isbn}
                  bookstoreUrl={bookstoreUrl}
                  imageUrl={imageUrl}
                  required={required}
                  amazonUrl={amazonUrl}
                />
              ))}
            </VStack>
          </Flex>
        </Box>
      ))}
    </Container>
  );
}
