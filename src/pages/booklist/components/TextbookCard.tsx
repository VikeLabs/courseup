import { InfoIcon } from '@chakra-ui/icons';
import { Container, Heading, Text } from '@chakra-ui/layout';
import { Flex, HStack, VStack } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

import { TextbookInfo } from '../api/getCourseTextbooks';
import { Textbook as TextbookType } from '../shared/types';

import { Textbook } from './Textbook';

type Props = Omit<TextbookInfo, 'term'>;

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
      <Heading size="lg">
        {subject} {code}
      </Heading>
      {sections.map(({ section, instructor, textbooks, additionalInfo }) => (
        <>
          <HStack justifyContent="space-between">
            <Heading size="md">{section}</Heading>
            <Heading size="md" color={mode('gray', 'dark.header')}>
              {instructor}
            </Heading>
          </HStack>
          {additionalInfo?.map((info) => (
            <HStack bgColor={mode('blue.200', 'blue.800')} py="2" pl="2" my="1" borderRadius="md">
              <InfoIcon mx="1" />
              <Text px="1">{info}</Text>
            </HStack>
          ))}
          <Flex alignItems="center" direction={{ base: 'column', md: 'row' }} mt="1">
            <VStack w="100%" alignItems="left" spacing="1em">
              {textbooks.map(({ title, authors, price, isbn, bookstoreUrl, imageUrl, required, amazonUrl }) => (
                <Textbook
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
        </>
      ))}
    </Container>
  );
}
