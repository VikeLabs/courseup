import { LinkIcon } from '@chakra-ui/icons';
import { Badge, Button, Flex, Heading, HStack, Table, Td, Text, Tr, VStack, Image, Tbody } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { logEvent } from 'lib/utils/logEvent';

const ISBN = require('simple-isbn').isbn;

type Props = {
  key: string;
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
  imageUrl?: string;
  required: boolean;
  amazonUrl?: string;
};

export function Textbook({
  title,
  authors,
  price: { newCad, usedCad, newAndDigitalAccessCad, digitalAccessCad },
  isbn,
  bookstoreUrl,
  imageUrl,
  required,
  amazonUrl,
}: Props) {
  const mode = useDarkMode();

  const handleTextbookClick = (url?: string) => {
    url && logEvent('textbook_click', { url });
  };

  amazonUrl = amazonUrl || `https://amazon.ca/dp/${ISBN.toIsbn10(isbn)}`;

  return (
    <Flex
      key={`${isbn}`}
      alignItems="center"
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      gap="8"
      boxShadow="md"
      borderRadius="lg"
      p="4"
      pt={{ base: '8', md: '4' }}
      backgroundColor={mode('gray.100', 'gray.700')}
    >
      <Flex alignItems={{ base: 'center', md: 'flex-start' }} direction={{ base: 'column', md: 'row' }} gap="4">
        <Image h="180px" w="120px" src={imageUrl} />
        <VStack h="100%" alignItems={{ base: 'center', md: 'start' }} gap="0.5">
          <Badge colorScheme={required ? 'orange' : 'green'}>{required ? 'required' : 'optional'}</Badge>
          <HStack>
            <Heading size="sm" maxW={{ base: '18rem', md: '100%' }} textAlign={{ base: 'center', md: 'left' }}>
              {title}
            </Heading>
          </HStack>
          <Text fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
            {authors?.join(', ')}
          </Text>
          <Table w="fit-content" size="sm" variant="unstyled" mt="2.25rem!important">
            <Tbody display="flex" flexDirection="column" gap="2">
              {newCad && (
                <Tr display="flex" gap="2">
                  <Td p="0" w="5rem">
                    <Text as="strong">NEW</Text>
                  </Td>
                  <Td p="0">{newCad}</Td>
                </Tr>
              )}
              {usedCad && (
                <Tr display="flex" gap="2">
                  <Td p="0" w="5rem">
                    <Text as="strong">USED</Text>
                  </Td>
                  <Td p="0">{usedCad}</Td>
                </Tr>
              )}
              {newAndDigitalAccessCad && (
                <Tr display="flex" gap="2">
                  <Td p="0" w="5rem">
                    <Text as="strong">NEW & DIGITAL ACCESS</Text>
                  </Td>
                  <Td p="0">{newAndDigitalAccessCad}</Td>
                </Tr>
              )}
              {digitalAccessCad && (
                <Tr display="flex" gap="2">
                  <Td p="0" w="5rem">
                    <Text as="strong">DIGITAL ACCESS</Text>
                  </Td>
                  <Td p="0">{digitalAccessCad}</Td>
                </Tr>
              )}
              <Tr display="flex" gap="2">
                <Td p="0" w="5rem">
                  <Text as="strong">ISBN-13</Text>
                </Td>
                <Td p="0">{isbn}</Td>
              </Tr>
            </Tbody>
          </Table>
        </VStack>
      </Flex>
      <VStack w={{ base: '100%', md: '10em' }} gap={{ base: '2' }} py={{ base: '5', md: '0' }}>
        <Button
          w="100%"
          colorScheme="blue"
          color="black"
          rightIcon={<LinkIcon />}
          disabled={bookstoreUrl === undefined}
          onClick={() => handleTextbookClick(bookstoreUrl)}
          as="a"
          href={bookstoreUrl}
          target="_blank"
        >
          UVic Bookstore
        </Button>
        <Button
          w="100%"
          //tabIndex={0}
          size="fit-content"
          boxShadow="md"
          borderRadius="md"
          as="a"
          href={amazonUrl}
          target="_blank"
          disabled={amazonUrl === undefined}
          onClick={() => handleTextbookClick(amazonUrl)}
        >
          <Image
            loading="lazy"
            src={process.env.PUBLIC_URL + `/assets/brands/${mode('amazon_light.png', 'amazon_dark.png')}`}
            h="2.4em"
            p="2"
          />
        </Button>
      </VStack>
    </Flex>
  );
}
