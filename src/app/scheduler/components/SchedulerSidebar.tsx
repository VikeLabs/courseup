import { Flex } from '@chakra-ui/layout';

export function SchedulerSidebar(): JSX.Element {
  return (
    <Flex minW="20%" maxW="25%" grow={1} bg="#E4E4E4">
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Flex direction="column" overflowY="auto">
          {/* Cards should go in here */}
        </Flex>
      </Flex>
    </Flex>
  );
}
