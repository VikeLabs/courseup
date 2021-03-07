import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack } from '@chakra-ui/react';

export interface TopBarProps {
  /**
   * Current selected subject, appears as heading
   */
  selectedSubject: string | undefined;
  /**
   * Back button click handler
   */
  handleTopBarBackClick(): void;
}

export function TopBar({ selectedSubject, handleTopBarBackClick }: TopBarProps): JSX.Element {
  return (
    <Box
      bg="white"
      p="1em"
      onClick={handleTopBarBackClick}
      top="0"
      m="0"
      borderBottom="0.1em solid black"
      boxShadow="md"
      zIndex="1000"
    >
      <HStack align="center">
        <Box>
          <ChevronLeftIcon color="black" visibility={selectedSubject ? 'visible' : 'hidden'} />
        </Box>
        <Heading color="black" size="sm">
          {selectedSubject || 'Subjects'}
        </Heading>
      </HStack>
    </Box>
  );
}
