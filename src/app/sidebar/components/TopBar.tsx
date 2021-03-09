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
    <HStack bg="white" p="1em" top="0" m="0" boxShadow="md" zIndex={500}>
      <Box>
        {selectedSubject && (
          <IconButton
            onClick={handleTopBarBackClick}
            aria-label="Back to subjects"
            icon={<ArrowLeftIcon />}
            size="xs"
            color="black"
            p="2"
          />
        )}
      </Box>
      <Heading pt="0.25em" color="black" size="sm">
        {selectedSubject || 'Subjects'}
      </Heading>
    </HStack>
  );
}
