import { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
  Text,
  Alert,
  AlertIcon,
  useMediaQuery,
} from '@chakra-ui/react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';

import { Timetable } from 'lib/fetchers';
import { SavedCourse, useSavedCourses } from 'lib/hooks/useSavedCourses';

import { SelectedCoursesCardList } from 'pages/scheduler/components/share/SelectedCoursesCardList';

export function ImportTimetable({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const { importCourses } = useSavedCourses();
  const toast = useToast();
  const [isSmallScreen] = useMediaQuery('(min-width:680px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filteredCoursesList: SavedCourse[] = [];
  const [filteredCourses, setFilteredCourses] = useState(filteredCoursesList);
  const [timetableTerm, setTimetableTerm] = useState('');
  const navigate = useNavigate();

  const handleImport = () => {
    importCourses(data.courses, data.term);
    onClose();
    navigate(`/scheduler/${timetableTerm}`);
    toast({
      title: 'Timetable imported!',
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
          color: color,
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
      <Button disabled={loading} rightIcon={<BsPlusCircleFill />} colorScheme="purple" onClick={onOpen}>
        Import Courses to Your Timetable
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Importing Timetable</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="15px">
              <Text>You are about to add the following courses to your saved courses.</Text>
              <SelectedCoursesCardList courses={filteredCourses} term={timetableTerm} />
              <Alert status="info" borderRadius="10px">
                {isSmallScreen ? <AlertIcon /> : null}
                This action will not delete the current courses you have saved, but will add to them.
              </Alert>
              <Text as="strong">Do you wish to continue?</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} m={2}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleImport} m={2}>
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
