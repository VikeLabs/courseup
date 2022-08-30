import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { Term } from 'lib/fetchers';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getReadableTerm } from 'lib/utils/terms';

import { ScreenshotModalContent } from './ScreenshotModalContent';

type Props = {
  filename: string;
  screenshotUrl: string;
  term: Term;
  onClose: () => void;
  isOpen: boolean;
};

export default function ScreenshotModal({ filename, screenshotUrl, term, onClose, isOpen }: Props) {
  const isSmallScreen = useSmallScreen();

  return (
    <>
      <Modal size={isSmallScreen ? 'full' : '2xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader textAlign="center" width={isSmallScreen ? '20rem' : 'full'}>
            Your {getReadableTerm(term || '')} timetable
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="20px" display="flex" alignItems="center">
            <ScreenshotModalContent filename={filename} isSmallScreen={isSmallScreen} screenshotUrl={screenshotUrl} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
