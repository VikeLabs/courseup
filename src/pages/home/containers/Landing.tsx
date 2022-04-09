import { useEffect, useState } from 'react';

import { Image } from '@chakra-ui/image';
import { Container, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { MdHowToVote } from 'react-icons/md';

export function Landing() {
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
      justifyItems="center"
      alignItems="center"
      textAlign={{ base: 'center', xl: 'left' }}
    >
      <GridItem colSpan={1}>
        <Container>
          <Heading fontSize="4.75em" lineHeight="1.25" mb="1.75rem">
            Logo contest voting
          </Heading>
          <Text fontSize="1.6em">
            Vote for your favourite logo! Click the button below to view submissions and cast your vote.
          </Text>
          <Button
            mt="1em !important"
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5EWpm5ItckY1aIvfF8jyrDvmBhRzbRwhM8EtrZ-GKscZgXw/viewform?usp=sf_link"
            colorScheme="pink"
            rightIcon={<MdHowToVote />}
            size="lg"
            target="_blank"
          >
            Vote now!
          </Button>
        </Container>
      </GridItem>
      <GridItem display={{ base: 'none', xl: 'initial' }} colSpan={1}>
        <Container>
          <Image
            alt="cartoon image of computer"
            src={process.env.PUBLIC_URL + '/assets/contest/voting.svg'}
            sx={{
              filter: 'drop-shadow( 1.5rem 1rem 1.75rem rgba(0, 0, 0, .25) )',
            }}
          />
        </Container>
      </GridItem>
    </Grid>
  );
}
