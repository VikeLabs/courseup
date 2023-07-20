import { Badge, Box, HStack, Tooltip } from '@chakra-ui/react';

import { useInstructorRating } from 'lib/fetchers';

export function Instructor({ name }: { name: string }): JSX.Element {
  const { data: rating, loading, error } = useInstructorRating({ queryParams: { name } });

  return (
    <HStack>
      <Box>{name}</Box>
      {!loading && !error && (
        <Badge colorScheme={rating && rating < 2 ? 'red' : rating && rating < 4 ? 'yellow' : 'green'}>
          <Tooltip label="Ratings from ratemyprofessors.com" aria-label="Ratings from ratemyprofessors.com" hasArrow>
            <Box
              style={{
                textDecoration: 'underline dotted',
              }}
            >
              {rating?.toPrecision(2)}/5
            </Box>
          </Tooltip>
        </Badge>
      )}
    </HStack>
  );
}
