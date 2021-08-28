import { LinkIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Table,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { IoBook, IoLogoAmazon } from 'react-icons/io5';

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
};

export function Textbook({
  title,
  authors,
  price: { newCad, usedCad, newAndDigitalAccessCad, digitalAccessCad },
  isbn,
  bookstoreUrl,
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
          <Badge colorScheme="orange">required</Badge>
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
      <VStack>
        <Button
          colorScheme="blue"
          rightIcon={<LinkIcon />}
          w="100%"
          disabled={bookstoreUrl === undefined}
          as="a"
          href={bookstoreUrl}
          target="_blank"
        >
          UVic Bookstore
        </Button>
        <Tooltip label="Coming soon...">
          {/** hacky work around to add the tooltip to a disabled button */}
          <Box>
            <Button colorScheme="orange" rightIcon={<IoLogoAmazon />} disabled>
              Get it on Amazon
            </Button>
          </Box>
        </Tooltip>
      </VStack>
    </Flex>
  );
}
