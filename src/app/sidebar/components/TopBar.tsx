import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton } from '@chakra-ui/react';

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
    <HStack
      bg="white"
      p="1em"
      onClick={handleTopBarBackClick}
      top="0"
      m="0"
      borderBottom="0.1em solid black"
      boxShadow="md"
      zIndex="1000"
    >
      <Box>
        <IconButton
          aria-label="Back to subjects"
          icon={<ArrowLeftIcon />}
          size="xs"
          background="null"
          color="black"
          visibility={selectedSubject ? 'visible' : 'hidden'}
        />
      </Box>
      <Heading pt="0.25em" color="black" size="sm">
        {selectedSubject || 'Subjects'}
      </Heading>
    </HStack>
  );
}
