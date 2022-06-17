import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { CreateTimetableResponse, Term } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getReadableTerm } from 'lib/utils/terms';

import { ShareModalContent } from './ShareModalContent';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  inSessionSavedCourses: SavedCourse[];
  term: Term;
  loading: boolean;
  timetable: CreateTimetableResponse;
};

export default function ShareTimetableModal({
  onClose,
  isOpen,
  inSessionSavedCourses,
  term,
  loading,
  timetable,
}: Props) {
  const isSmallScreen = useSmallScreen();

  return (
    <>
      <Modal size={isSmallScreen ? 'full' : '2xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>Share your {getReadableTerm(term || '')} timetable</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <ShareModalContent
              loading={loading}
              timetable={timetable}
              courses={inSessionSavedCourses}
              isSmallScreen={isSmallScreen}
              term={term || ''}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
