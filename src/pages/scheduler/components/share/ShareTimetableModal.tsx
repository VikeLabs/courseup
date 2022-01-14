import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react';

import { CreateTimetableResponse, Term } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { ShareModalContent } from './ShareModalContent';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  inSession_savedCourses: SavedCourse[];
  term: Term;
  loading: boolean;
  timetable: CreateTimetableResponse;
};

export default function ShareTimetableModal({
  onClose,
  isOpen,
  inSession_savedCourses,
  term,
  loading,
  timetable,
}: Props) {
  const [isSmallScreen] = useMediaQuery('(min-width:680px)');

  return (
    <>
      <Modal size={isSmallScreen ? '2xl' : 'full'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>Share your {getReadableTerm(term || '')} timeline</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <ShareModalContent
              loading={loading}
              timetable={timetable}
              courses={inSession_savedCourses}
              isSmallScreen={isSmallScreen}
              term={term || ''}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
