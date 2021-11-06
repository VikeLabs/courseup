import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { HStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { BsArrowRepeat, BsPlusCircleFill } from 'react-icons/bs';

import { Timetable } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

function ImportTimetable({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const { importCourses } = useSavedCourses();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImport = () => {
    importCourses(data.courses, data.term, false);
    onClose();
    toast({
      title: 'Timetable Imported!',
      status: 'success',
      duration: 3000,
    });
  };

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
            You are about to add the courses from this timetable to your saved courses. <br />
            This action will NOT delete the current courses you have saved, but will add to them. Do you wish to
            continue?
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

function ReplaceTimetable({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const { importCourses } = useSavedCourses();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReplace = () => {
    importCourses(data.courses, data.term, true);
    onClose();
    toast({
      title: 'Timetable Replaced!',
      status: 'success',
      duration: 3000,
    });
  };
  return (
    <>
      <Button disabled={loading} rightIcon={<BsArrowRepeat />} colorScheme="green" onClick={onOpen}>
        Replace Your Timetable
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Replacing Timetable</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You are about to add the courses from this timetable to your saved courses. <br />
            This action will delete ALL the current courses you have saved for this term, and replace them with this
            timetable's courses. Do you wish to continue?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} m={2}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleReplace} m={2}>
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ImportButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  return (
    <HStack spacing={10}>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
    </HStack>
  );
}
