import { IconButton } from '@chakra-ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
  Center,
  Text,
  Box,
  Link,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { VscFeedback, VscChevronDown } from 'react-icons/vsc';

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
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent pos="sticky" mr="25px" maxH="500px" overflowY="scroll">
          <PopoverHeader bg="blue.500" color="white" fontWeight="bold" textAlign="center">
            Feedback
          </PopoverHeader>
          <Box px="15px" color="gray.600">
            <PopoverBody textAlign="left">
              Clockwork is in the early stages of development and feedback is greatly appreciated! <br />
              Share your thoughts with the development team on the following forums:
              <Link href="" target="_empty" _hover={{ textDecoration: 'none' }}>
                <VStack borderRadius="xl" bg="white" mt="20px" shadow="md">
                  <Center bg="blue.300" borderTopRadius="xl" maxH="60px" objectFit="cover" overflow="hidden">
                    <Image src="https://growthsupermarket.com/wp-content/uploads/2018/06/GoogleForms_logo-e1529921391153.png" />
                  </Center>
                  <Box px="20px" pb="20px">
                    Provide your thoughts and feedback on the site by filling out the Google Form.
                  </Box>
                </VStack>
              </Link>
              <Link
                href="https://github.com/VikeLabs/clockwork/discussions"
                target="_empty"
                _hover={{ textDecoration: 'none' }}
              >
                <VStack borderRadius="xl" bg="white" mt="10px" shadow="md">
                  <Center bg="blue.300" borderTopRadius="xl" maxH="60px" objectFit="cover" overflow="hidden">
                    <Image
                      src="https://pngimg.com/uploads/github/github_PNG15.png"
                      h="100%"
                      objectFit="cover"
                      overflow="hidden"
                    />
                  </Center>
                  <Box px="20px" pb="20px">
                    <Text>Help us fix bugs by contributing to the discussion on GitHub.</Text>
                  </Box>
                </VStack>
              </Link>
            </PopoverBody>
          </Box>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
