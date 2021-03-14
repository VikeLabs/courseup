import { IconButton } from '@chakra-ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Portal,
  Center,
  HStack,
  Text,
  Box,
  Link,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaGithub, FaBug } from 'react-icons/fa';
import { VscFeedback, VscChevronDown, VscMail } from 'react-icons/vsc';

export function Feedback(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);

  return (
    <Popover closeOnEsc={false} isOpen={isOpen} autoFocus={false}>
      <PopoverTrigger>
        <IconButton
          colorScheme="blue"
          isRound
          aria-label="Feedback"
          size="lg"
          fontSize="25px"
          icon={isOpen ? <VscChevronDown /> : <VscFeedback />}
          shadow="dark-lg"
          onClick={open}
          _focus={{
            shadow: 'dark-lg',
          }}
        >
          yo
        </IconButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent pos="sticky" mr={25}>
          <PopoverHeader bg="blue.500" color="white" fontWeight="bold" textAlign="center">
            Feedback
          </PopoverHeader>
          <PopoverBody textAlign="left">
            Clockwork is in the early stages of development and feedback is greatly appreciated.
            <VStack borderRadius="xl" bg="gray.100" mt="10px">
              <Box bg="blue.300" borderTopRadius="xl">
                <Text fontWeight="bold" textAlign="center">
                  Provide feedback via Google Form:
                </Text>
              </Box>
              <HStack p="10px">
                <Box>
                  <VscMail fontSize="30px" />
                </Box>
                <Text flexGrow={1}>email</Text>
              </HStack>
            </VStack>
            <VStack borderRadius="xl" bg="gray.100" mt="10px">
              <Box bg="blue.300" borderTopRadius="xl">
                <Text fontWeight="bold" textAlign="center">
                  Provide feedback directly on GitHub:
                </Text>
              </Box>
              <Divider />
              <HStack p="10px">
                <Box w="fit-content">
                  <FaGithub fontSize="30px" />
                </Box>
                <Link color="blue" href="https://github.com/VikeLabs/clockwork/discussions" target="_blank">
                  GitHub Discussion
                </Link>
              </HStack>
              <HStack p="10px">
                <Box w="fit-content">
                  <FaBug fontSize="30px" />
                </Box>
                <Link color="blue" href="https://github.com/VikeLabs/clockwork/issues/new" target="_blank">
                  Report a bug
                </Link>
              </HStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
