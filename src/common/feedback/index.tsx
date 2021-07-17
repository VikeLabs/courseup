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
  alt: string;
};

function FeedbackButton({ href, src, alt }: Props): JSX.Element | null {
  return (
    <Button as="a" href={href} target="_empty" h="6rem" w="6rem" p="0.75rem" boxShadow="md" borderRadius="1rem">
      <Image src={src} alt={alt} />
    </Button>
  );
}

export function Feedback(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);

  return (
    <Box position="absolute" bottom="1.5rem" right="1.5rem" zIndex={999}>
      <Popover isOpen={isOpen} autoFocus={false} placement="top-end" flip={false}>
        <PopoverTrigger>
          <IconButton
            colorScheme="blue"
            bgColor="rgba(49, 130, 206, 0.75)"
            isRound
            aria-label="Feedback"
            size="lg"
            fontSize="1.5625rem"
            icon={isOpen ? <VscChevronDown /> : <VscFeedback />}
            shadow="dark-lg"
            onClick={open}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent boxShadow="md">
            <PopoverHeader
              borderRadius="0.3rem 0.3rem 0 0"
              bgColor="#7cbce2"
              color="black"
              fontWeight="bold"
              textAlign="center"
            >
              <p>Feedback</p>
            </PopoverHeader>
            <PopoverBody color="gray.600">
              <p>Want to help us improve CourseUp?</p>
              <p>
                <Text as="strong">Send us your feedback via Google Forms or GitHub Discussions.</Text>
              </p>
              <Center p="0.75rem 1rem 0.5rem">
                <HStack>
                  <FeedbackButton
                    src={process.env.PUBLIC_URL + '/assets/brands/forms.png'}
                    href="https://docs.google.com/forms/d/1b84DohHHxiPbkQi-YzQ6OH5Rq4LEu8ou7OPVP-S430I"
                    alt="Feedback"
                  ></FeedbackButton>
                  <Spacer />
                  <FeedbackButton
                    src={process.env.PUBLIC_URL + '/assets/brands/github.png'}
                    href="https://github.com/VikeLabs/courseup/discussions"
                    alt="GitHub"
                  ></FeedbackButton>
                </HStack>
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}
