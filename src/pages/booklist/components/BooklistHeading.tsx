import { Container, Divider, Flex, Heading, Text, Center, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { getReadableTerm } from 'lib/utils/terms';

export function BooklistHeading() {
  const { term } = useParams();
  const readableTerm = getReadableTerm(term);

  return (
    <Container alignItems="center" maxW="container.xl">
      <HStack>
        <Center flexDir={{ md: 'row', base: 'column' }} alignItems="center" w="100%">
          <Heading fontSize={{ base: '1.5rem', md: '2.15rem' }} as="h1" marginBottom={{ base: '1rem', md: '0' }}>
            Booklist for {readableTerm}
          </Heading>
        </Center>
      </HStack>
      <Divider my="4" />
      <Flex direction="column">
        <Text w="100%" textAlign="left">
          The following is a booklist for the <Text as="strong">{readableTerm} </Text>term compiled from the saved
          courses on your timetable. Please note that this feature is still in <Text as="strong">beta</Text>. Please
          feel free to provide any feedback or report bugs via the <Text as="strong">Feedback Button</Text> at the
          bottom right of your screen! Purchases made through store links may provide compensation to CourseUp and
          VikeLabs. This helps keep the platform free of ads and supports development.
        </Text>
      </Flex>
    </Container>
  );
}
