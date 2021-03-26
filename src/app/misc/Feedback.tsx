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
import { PropsWithChildren, useState } from 'react';
import { VscFeedback, VscChevronDown } from 'react-icons/vsc';

type Props = {
  src: string;
  href: string;
};

function FeedbackButton({ href, src, children }: PropsWithChildren<Props>): JSX.Element | null {
  return (
    <Button as="a" href={href} target="_empty" bg="white" h="fit-content" w="fit-content" p="10px">
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
        <PopoverContent overflowY="auto" bg="#E4E4E4" minW="300px">
          <PopoverHeader bg="blue.500" color="white" fontWeight="bold" textAlign="center">
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
                  src={process.env.PUBLIC_URL + '/assets/forms.png'}
                  //TODO: add link once google form is made
                  href=""
                ></FeedbackButton>
                <Spacer />
                <FeedbackButton
                  src={process.env.PUBLIC_URL + '/assets/github.png'}
                  href="https://github.com/VikeLabs/clockwork/discussions"
                ></FeedbackButton>
              </HStack>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
