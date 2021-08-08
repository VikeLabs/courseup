import { CopyIcon } from '@chakra-ui/icons';
import { Heading, HStack, VStack, Text, WrapItem, Wrap } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { IoShareOutline } from 'react-icons/io5';
import { useParams } from 'react-router';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import { SavedCourse, useSavedCourses } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

const InformationText = (props: { term: string }) => {
  return (
    <Alert status="info" borderRadius="10px">
      <AlertIcon />
      We've generated a link that you can share to allow people to view, compare, and import the courses and sections
      you currently have selected for the {getReadableTerm(props.term)} term.
    </Alert>
  );
};

const ShareCourseCard = (props: { course: SavedCourse }) => {
  return (
    <Flex height="100%" direction="column">
      <HStack w="100%" bg="#EDF2F7" justifyContent="center" p="0.2em" borderTopRadius="4px" padding="4px">
        <Heading size="xs">
          {props.course.subject} {props.course.code}
        </Heading>
      </HStack>
      <VStack bg={props.course.color} flex={1} justifyContent="center" borderBottomRadius="4px" padding="4px">
        <Heading justifyContent="center" size="sm">
          {props.course.lecture} {props.course.lab} {props.course.tutorial}
        </Heading>
      </VStack>
    </Flex>
  );
};

const SelectedCoursesTable = (props: { term: string }) => {
  const { courses } = useSavedCourses();

  return (
    <Wrap variant="striped">
      {courses.filter((course) => course.term === props.term).length > 0 ? (
        courses
          .filter((course) => course.term === props.term)
          .map((course) => {
            return (
              <WrapItem>
                <ShareCourseCard course={course} />
              </WrapItem>
            );
          })
      ) : (
        <Text>
          It looks like you don't have any courses selected. Add some courses to your timetable before sharing.
        </Text>
      )}
    </Wrap>
  );
};

const SocialMediaButtons = (props: { slug: string }) => {
  return (
    <HStack justify="center">
      <EmailShareButton children={<EmailIcon round={true} />} url={props.slug} />
      <FacebookShareButton children={<FacebookIcon round={true} />} url={props.slug} />
      <TelegramShareButton children={<TelegramIcon round={true} />} url={props.slug} />
      <WhatsappShareButton children={<WhatsappIcon round={true} />} url={props.slug} />
      <TwitterShareButton children={<TwitterIcon round={true} />} url={props.slug} />
    </HStack>
  );
};

const CopyLinkUrl = (props: { slug: string }) => {
  return (
    <HStack justify="space-between" padding="5px" borderWidth="1px" borderColor="gray.300">
      <HStack justify="center" flexGrow={4}>
        <Icon boxSize="1.25em" as={HiLink} />
        <Input id="timetable_slug" value={props.slug} variant="filled" isReadOnly={true} />
      </HStack>
      <Button
        size="sm"
        colorScheme="blue"
        leftIcon={<CopyIcon />}
        onClick={() => {
          var el = document.getElementById('timetable_slug') as HTMLInputElement;
          el.focus();
          el.select();
          document.execCommand('copy');
        }}
      >
        Copy
      </Button>
    </HStack>
  );
};

const ShareTimetableContent = (props: { term: string }) => {
  const slug = 'https://courseup.ca/s/9w845yetg9d8gh938wrhsde9';

  return (
    <VStack align="left" spacing="15px">
      <InformationText term={props.term} />
      <Heading size="sm"> What you are sharing </Heading>
      <SelectedCoursesTable term={props.term} />
      <Heading size="sm"> Share this link via </Heading>
      <SocialMediaButtons slug={slug} />
      <Heading size="sm"> Or copy link </Heading>
      <CopyLinkUrl slug={slug} />
    </VStack>
  );
};

export default function ShareTimetableButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { term } = useParams();

  return (
    <>
      <Button size="sm" bg="blue.400" color="white" leftIcon={<Icon as={IoShareOutline} />} onClick={onOpen}>
        Share
      </Button>

      <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share your {getReadableTerm(term)} timeline</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ShareTimetableContent term={term} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
