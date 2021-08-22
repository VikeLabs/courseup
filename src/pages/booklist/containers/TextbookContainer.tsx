import { LinkIcon } from '@chakra-ui/icons';
import { Container, Heading } from '@chakra-ui/layout';
import { Badge, Button, Flex, HStack, Image, Spacer, Table, Td, Text, Tr, VStack } from '@chakra-ui/react';
import { IoLogoAmazon } from 'react-icons/io5';

import { useDarkMode } from 'lib/hooks/useDarkMode';

export type Textbook = {
  bookstoreUrl?: string;
  imageUrl?: string;
  title: string;
  authors?: string[];
  required: boolean;
  // prices stored in the following format '$78.95'
  // TODO: format these in cents and store as number
  price: {
    newCad?: string;
    usedCad?: string;
    digitalAccessCad?: string;
    newAndDigitalAccessCad?: string;
  };
  isbn?: string;
  instructor?: string;
};

type Props = {
  textbook: CourseTextbooks;
};

export type CourseTextbooks = {
  subject: string;
  code: string;
  section: string;
  additionalInfo?: string[];
  instructor?: string;
  textbooks: Textbook[];
};

export function TextbookContainer({ textbook }: Props) {
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
      px="3"
      py="1"
      textAlign="left"
    >
      <HStack justifyContent="space-between">
        <Heading size="lg">
          {textbook.subject} {textbook.code}
        </Heading>
        <Heading size="md" color={mode('gray', 'dark.header')}>
          {textbook.instructor}
        </Heading>
      </HStack>
      <Heading size="md">{textbook.section}</Heading>
      <Flex alignItems="center" direction={{ base: 'column', md: 'row' }}>
        <Image src={textbook.textbooks[0].imageUrl} />
        <VStack ml="1" h="100%" alignItems={{ base: 'center', md: 'start' }}>
          <HStack>
            <Heading size="sm">{textbook.textbooks[0].title}</Heading>
            <Badge colorScheme="orange">required</Badge>
          </HStack>
          <Text>{textbook.textbooks[0].authors?.join(', ')}</Text>
          <Table w="fit-content" size="sm" variant="unstyled">
            <Tr>
              <Td p="0">
                <Text as="strong">NEW</Text>
              </Td>{' '}
              <Td p="0">{textbook.textbooks[0].price.newCad}</Td>
            </Tr>
            <Tr>
              <Td p="0">
                <Text as="strong">USED</Text>
              </Td>{' '}
              <Td p="0">{textbook.textbooks[0].price.usedCad}</Td>
            </Tr>
            <Tr>
              <Td pl="0" pt="10">
                <Text as="strong">ISBN</Text>
              </Td>{' '}
              <Td pl="0" pt="10">
                {' '}
                {textbook.textbooks[0].isbn}
              </Td>
            </Tr>
          </Table>
        </VStack>
        <Spacer />
        <VStack>
          <Button colorScheme="blue" rightIcon={<LinkIcon />} w="100%">
            UVic Bookstore
          </Button>
          <Button colorScheme="orange" rightIcon={<IoLogoAmazon />}>
            Get it on Amazon
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
}
