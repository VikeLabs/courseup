import { Image } from '@chakra-ui/image';
import { Container, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

export default function Landing() {
  const [handIndex, setHandIndex] = useState(0);
  const hands = ['👋', '👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHandIndex((handIndex + 1) % hands.length);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handIndex, hands.length]);

  return (
    <Grid
      templateColumns={{ xl: 'repeat(2, 1fr)', lg: 'repeat(1, 1fr)' }}
      gap={2}
      m={10}
      h="100%"
      justifyItems="center"
      alignItems="center"
    >
      <GridItem colSpan={1}>
        <Container>
          <Heading fontSize="4.75em" lineHeight="1.25" mb="1.75rem">
            Explore UVic Courses
          </Heading>
          <Text fontSize="1.6em">CourseUp makes it simple to browse and schedule UVic Courses</Text>
          <Flex alignItems="center" mt="1rem" as="a" w="fit-content" target="_blank" href="https://www.vikelabs.ca">
            <Text color="#4C6EA5" fontSize={{ base: '1em', md: '1.5em' }}>
              <span>{hands[handIndex]}</span> Built by students @
            </Text>
            <Text fontWeight="bolder" fontSize="1.75em" color="#222B49" ml="1">
              VIKE LABS
            </Text>
          </Flex>
        </Container>
      </GridItem>
      <GridItem display={{ base: 'none', xl: 'initial' }} colSpan={1}>
        <Container>
          <Image
            alt=""
            src={process.env.PUBLIC_URL + '/assets/computer.svg'}
            sx={{
              filter: 'drop-shadow( 1.5rem 1rem 1.75rem rgba(0, 0, 0, .25) )',
            }}
            
          />
        </Container>
      </GridItem>
    </Grid>
  );
}
