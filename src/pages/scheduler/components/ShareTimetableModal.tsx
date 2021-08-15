import { CopyIcon } from '@chakra-ui/icons';
import { Heading, HStack, VStack, Text, WrapItem, Wrap } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  Box,
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
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
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

import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

const InformationText = (props: { isSmallScreen: boolean; term: string }) => {
  return (
    <Alert status="info" borderRadius="10px">
      {props.isSmallScreen ? <AlertIcon /> : null}
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

const SelectedCoursesTable = (props: { courses: Array<SavedCourse>; term: string }) => {
  return (
    <Wrap variant="striped">
      {props.courses.length > 0 ? (
        props.courses.map((course) => {
          if (course.lecture || course.lab || course.tutorial) {
            return (
              <WrapItem>
                <ShareCourseCard course={course} />
              </WrapItem>
            );
          }
          return null;
        })
      ) : (
        <Text>
          Unable to find saved courses for <Box as="strong"> {getReadableTerm(props.term || '')} </Box>
        </Text>
      )}
    </Wrap>
  );
};

const SocialMediaButtons = (props: { slug: string }) => {
  return (
    <HStack justify="center">
      <EmailShareButton children={<EmailIcon size={50} round={true} />} url={props.slug} />
      <FacebookShareButton children={<FacebookIcon size={50} round={true} />} url={props.slug} />
      <TelegramShareButton children={<TelegramIcon size={50} round={true} />} url={props.slug} />
      <WhatsappShareButton children={<WhatsappIcon size={50} round={true} />} url={props.slug} />
      <TwitterShareButton children={<TwitterIcon size={50} round={true} />} url={props.slug} />
    </HStack>
  );
};

const CopyLinkUrl = (props: { isSmallScreen: boolean; slug: string }) => {
  const toast = useToast();
  return (
    <HStack justify="space-between" padding="5px" borderWidth="1px" borderColor="gray.300">
      <HStack justify="center" flexGrow={4}>
        {props.isSmallScreen ? <Icon boxSize="1.25em" as={HiLink} /> : undefined}
        <Input id="timetable_slug" value={props.slug} variant="filled" isReadOnly={true} />
      </HStack>
      <Button
        size={props.isSmallScreen ? 'sm' : 'md'}
        colorScheme="blue"
        leftIcon={<CopyIcon />}
        onClick={() => {
          var el = document.getElementById('timetable_slug') as HTMLInputElement;
          el.focus();
          el.select();
          document.execCommand('copy');
          toast({
            title: 'Copied.',
            status: 'success',
            duration: 3000,
          });
        }}
      >
        Copy
      </Button>
    </HStack>
  );
};

const ShareTimetableContent = (props: { courses: Array<SavedCourse>; isSmallScreen: boolean; term: string }) => {
  const slug = 'https://courseup.ca/s/9w845yetg9d8gh938wrhsde9';

  return (
    <VStack align="left" spacing="15px">
      <InformationText isSmallScreen={props.isSmallScreen} term={props.term} />
      <Heading size="sm"> What you are sharing </Heading>
      <SelectedCoursesTable courses={props.courses} term={props.term} />
      <Heading size="sm"> Share this link via </Heading>
      <SocialMediaButtons slug={slug} />
      <Heading size="sm"> Or copy link </Heading>
      <CopyLinkUrl isSmallScreen={props.isSmallScreen} slug={slug} />
    </VStack>
  );
};

type Props = {
  onClose: () => void;
  isOpen: boolean;
  inSession_savedCourses: SavedCourse[];
};

export default function ShareTimetableModal({ onClose, isOpen, inSession_savedCourses }: Props) {
  const { term } = useParams();
  const [isSmallScreen] = useMediaQuery('(min-width:680px)');

  return (
    <>
      <Modal size={isSmallScreen ? '2xl' : 'full'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>Share your {getReadableTerm(term || '')} timeline</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ShareTimetableContent courses={inSession_savedCourses} isSmallScreen={isSmallScreen} term={term || ''} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
