import { useState } from 'react';

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
  Button,
  Spacer,
  HStack,
  Box,
  Image,
} from '@chakra-ui/react';
import { VscFeedback, VscChevronDown } from 'react-icons/vsc';

type Props = {
  src: string;
  href: string;
};

function FeedbackButton({ href, src }: Props): JSX.Element | null {
  return (
    <Button
      as="a"
      href={href}
      target="_empty"
      h="fit-content"
      w="fit-content"
      p="10px"
      boxShadow="md"
      borderRadius="20%"
    >
      <Image src={src} />
    </Button>
  );
}

export function Feedback(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);

  return (
    <Popover isOpen={isOpen} autoFocus={false} placement="top-end" flip={false}>
      <PopoverTrigger>
        <IconButton
          colorScheme="blue"
          bgColor="rgba(49, 130, 206, 0.75)"
          isRound
          aria-label="Feedback"
          size="lg"
          fontSize="25px"
          icon={isOpen ? <VscChevronDown /> : <VscFeedback />}
          shadow="dark-lg"
          onClick={open}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent overflowY="auto" minW="300px" boxShadow="md">
          <PopoverHeader bgGradient="linear(to-l, #2e95d1, #7cbce2)" color="white" fontWeight="bold" textAlign="center">
            Feedback
          </PopoverHeader>
          <PopoverBody color="gray.600" py="10px">
            <Box px="5px">
              Feedback is greatly appreciated during our early stages of development! <br />
              <Text as="strong">Share your thoughts here:</Text>
            </Box>
            <Center w="100%" mt="10px">
              <HStack w="75%">
                <FeedbackButton
                  src={process.env.PUBLIC_URL + '/assets/brands/forms.png'}
                  href="https://docs.google.com/forms/d/1b84DohHHxiPbkQi-YzQ6OH5Rq4LEu8ou7OPVP-S430I"
                ></FeedbackButton>
                <Spacer />
                <FeedbackButton
                  src={process.env.PUBLIC_URL + '/assets/brands/github.png'}
                  href="https://github.com/VikeLabs/courseup/discussions"
                ></FeedbackButton>
              </HStack>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
