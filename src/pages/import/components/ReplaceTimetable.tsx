import { useState, useEffect } from 'react';

import {
  useToast,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { BsArrowRepeat } from 'react-icons/bs';
import { useNavigate } from 'react-router';

import { Timetable } from 'lib/fetchers';
import { SavedCourse, useSavedCourses } from 'lib/hooks/useSavedCourses';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import { SelectedCoursesCardList } from 'pages/scheduler/components/share/SelectedCoursesCardList';

export function ReplaceTimetable({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const { replaceCourses } = useSavedCourses();
  const toast = useToast();
  const isSmallScreen = useSmallScreen();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filteredCoursesList: SavedCourse[] = [];
  const [filteredCourses, setFilteredCourses] = useState(filteredCoursesList);
  const [timetableTerm, setTimetableTerm] = useState('');
  const navigate = useNavigate();

  const handleReplace = () => {
    replaceCourses(data.courses, data.term);
    onClose();
    navigate(`/scheduler/${timetableTerm}`);
    toast({
      title: 'Timetable replaced!',
      status: 'success',
      duration: 3000,
    });
  };

  useEffect(() => {
    if (data && !loading) {
      data.courses.forEach(({ subject, code, pid, lecture, lab, tutorial, color }) => {
        const newCourse: SavedCourse = {
          subject,
          pid,
          code,
          term: data.term,
          selected: true,
          showSections: true,
          lecture: lecture ? lecture[0] : undefined,
          lab: lab ? lab[0] : undefined,
          tutorial: tutorial ? tutorial[0] : undefined,
          color,
        };
        filteredCoursesList.push(newCourse);
      });
      setFilteredCourses(filteredCoursesList);
      setTimetableTerm(data.term);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Button
        borderRadius={0}
        disabled={loading}
        rightIcon={<BsArrowRepeat />}
        colorScheme="orange"
        onClick={onOpen}
        isFullWidth
      >
        Replace Your Timetable
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Replacing Timetable</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="15px">
              <Text>You are about to replace the courses on your timetable with the following courses:</Text>
              <SelectedCoursesCardList courses={filteredCourses} term={timetableTerm} />
              <Alert status="warning" borderRadius="10px">
                {isSmallScreen ? <AlertIcon /> : null}
                <Text>
                  This action will <Text as="strong">DELETE ALL</Text> the current courses you have saved for this term,
                  and replace them with this timetable&apos;s courses.
                </Text>
              </Alert>
              <Text as="strong">Do you wish to continue?</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} m={2}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleReplace} m={2}>
              Replace
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
