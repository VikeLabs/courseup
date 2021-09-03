import { LinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Table,
  Td,
  Text,
  Tr,
  VStack,
  Image,
} from '@chakra-ui/react';
import { IoBook } from 'react-icons/io5';

import { useDarkMode } from 'lib/hooks/useDarkMode';

type Props = {
  title: string;
  authors?: string[];
  price: {
    newCad?: string;
    usedCad?: string;
    digitalAccessCad?: string;
    newAndDigitalAccessCad?: string;
  };
  isbn?: string;
  bookstoreUrl?: string;
  required: boolean;
  amazonUrl?: string;
};

export function Textbook({
  title,
  authors,
  price: { newCad, usedCad, newAndDigitalAccessCad, digitalAccessCad },
  isbn,
  bookstoreUrl,
  required,
  amazonUrl,
}: Props) {
  const mode = useDarkMode();

  return (
    <Flex alignItems="center" direction={{ base: 'column', md: 'row' }} mt="1">
      {/* TODO: Replace with image from API */}
      {/* <Image src={textbook.textbooks[0].imageUrl} /> */}
      <Center
        h="167px"
        w="120px"
        bgColor={mode('rgba(114, 114, 114, 0.459)', 'rgba(58, 58, 58, 0.459)')}
        mr="1"
        borderRadius="5"
      >
        <IoBook size="3em" />
      </Center>
      <VStack ml="1" h="100%" alignItems={{ base: 'center', md: 'start' }}>
        <HStack>
          <Heading size="sm">{title}</Heading>
          <Badge colorScheme={required ? 'orange' : 'green'}>{required ? 'required' : 'optional'}</Badge>
        </HStack>
        <Text>{authors?.join(', ')}</Text>
        <Table w="fit-content" size="sm" variant="unstyled">
          {newCad && (
            <Tr>
              <Td p="0" w="10px">
                <Text as="strong">NEW</Text>
              </Td>{' '}
              <Td p="0">{newCad}</Td>
            </Tr>
          )}
          {usedCad && (
            <Tr>
              <Td p="0" w="10px">
                <Text as="strong">USED</Text>
              </Td>
              <Td p="0">{usedCad}</Td>
            </Tr>
          )}
          {newAndDigitalAccessCad && (
            <Tr>
              <Td p="0" w="10px">
                <Text as="strong" mr="4">
                  NEW & DIGITAL ACCESS
                </Text>
              </Td>
              <Td p="0">{newAndDigitalAccessCad}</Td>
            </Tr>
          )}
          {digitalAccessCad && (
            <Tr>
              <Td p="0" w="10px">
                <Text as="strong" mr="4">
                  DIGITAL ACCESS
                </Text>
              </Td>
              <Td p="0">{digitalAccessCad}</Td>
            </Tr>
          )}
          <Tr>
            <Td pl="0" pt="10">
              <Text as="strong">ISBN</Text>
            </Td>
            <Td pl="0" pt="10">
              {isbn}
            </Td>
          </Tr>
        </Table>
      </VStack>
      <Spacer />
      <VStack ml="3" w="10em">
        <Button
          w="100%"
          colorScheme="blue"
          rightIcon={<LinkIcon />}
          disabled={bookstoreUrl === undefined}
          as="a"
          href={bookstoreUrl}
          target="_blank"
        >
          UVic Bookstore
        </Button>

        <Button
          tabIndex={0}
          size="fit-content"
          as="a"
          href={amazonUrl}
          target="_blank"
          disabled={amazonUrl === undefined}
        >
          <Image
            loading="lazy"
            boxShadow="md"
            borderRadius="md"
            src={process.env.PUBLIC_URL + `/assets/brands/${mode('amazon_light.png', 'amazon_dark.png')}`}
            h="2.4em"
            p="2"
          />
        </Button>
      </VStack>
    </Flex>
  );
}
