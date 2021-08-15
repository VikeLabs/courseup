import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react';
import { useParams } from 'react-router';

import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

import { ShareModalContent } from './ShareModalContent';

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
            <ShareModalContent courses={inSession_savedCourses} isSmallScreen={isSmallScreen} term={term || ''} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
