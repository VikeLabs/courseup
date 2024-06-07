import { Box, Flex, Heading } from '@chakra-ui/react';

import { Term } from 'lib/fetchers';
import { getReadableTerm } from 'lib/utils/terms';

type Props = {
  term: Term;
  subjects: {
    subject: string;
    title: string;
  }[];
};

export default function ExplorePage({ term, subjects }: Props) {
  return (
    <Flex wrap="wrap" gap={6}>
      {subjects && subjects.length > 1 ? (
        subjects.map((subject) => (
          <Box
            as="a"
            href={`/explore/${term}/${subject.subject}`}
            key={subject.subject}
            minW={200}
            w="20%"
            minH={100}
            flexGrow={1}
            p={6}
            borderRadius="lg"
            shadow="md"
            transition="0.5s"
            _hover={{ shadow: 'xl' }}
          >
            <Heading size="md" color="black">
              {subject.title}
            </Heading>
          </Box>
        ))
      ) : (
        <Box minW={200} w="20%" minH={100} flexGrow={1} p={6} borderRadius="lg" transition="0.5s">
          <Heading size="md">No subjects found for {getReadableTerm(term)}</Heading>
        </Box>
      )}
    </Flex>
  );
}
