import { CopyIcon } from '@chakra-ui/icons';
import { Heading, HStack, VStack, Text, WrapItem, Wrap, Center } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  Button,
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
    <Center borderWidth="1px" borderColor="gray.300" padding="10px" shadow="0px 0px 3px #ccc">
      <VStack>
        <Heading size="sm">
          {props.course.subject} {props.course.code}
        </Heading>
        <>
          {props.course.lecture} {props.course.lab} {props.course.tutorial}
        </>
      </VStack>
    </Center>
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

const CopyLinkUrl = () => {
  return (
    <HStack justify="space-between" padding="5px" borderWidth="1px" borderColor="gray.300">
      <HStack justify="center" flexGrow={4}>
        <Icon boxSize="1.25em" as={HiLink} />
        <Input
          id="timetable_slug"
          value="https://courseup.ca/s/9w845yetg9d8gh938wrhsde9"
          variant="filled"
          isReadOnly={true}
        />
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
  return (
    <VStack align="left" spacing="15px">
      <InformationText term={props.term} />
      <Heading size="sm"> What you are sharing </Heading>
      <SelectedCoursesTable term={props.term} />
      <Heading size="sm"> Copy link </Heading>
      <CopyLinkUrl />
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
