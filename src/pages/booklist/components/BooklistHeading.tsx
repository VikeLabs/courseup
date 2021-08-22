import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Container, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Center, HStack, Link as Links } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { getReadableTerm } from 'lib/utils';

export function BooklistHeading() {
  const { term } = useParams();

  return (
    <Container alignItems="center" maxW="container.xl">
      <HStack>
        <Links as={Link} to={`/scheduler/${term}`} display="flex" alignItems="center">
          <ChevronLeftIcon fontSize="2.1875rem" colorScheme="white" verticalAlign="bottom" aria-label="back" />
        </Links>
        <Center direction={{ md: 'row', base: 'column' }} alignItems="center" w="100%">
          <Heading fontSize={{ base: '1.5rem', md: '2.15rem' }} as="h1" marginBottom={{ base: '1rem', md: '0' }}>
            Booklist for {`${getReadableTerm(term)}`}
          </Heading>
        </Center>
      </HStack>
      <Divider my="4" />
      <Flex>
        <Text w="100%" textAlign="left">
          The following is a booklist for the <Text as="strong">Fall 2021 </Text>term compiled from the saved courses on
          your timetable. Please note that this feature is still in <Text as="strong">beta</Text>. Please feel free to
          provide any feedback or report bugs via the <Text as="strong">Feedback Button</Text> at the bottom right of
          your screen!
        </Text>
      </Flex>
    </Container>
  );
}
