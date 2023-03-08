import { useEffect } from 'react';

import { Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';

// TODO: real mobile functionality
export function Mobile(): JSX.Element | null {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const smallScreen = useSmallScreen();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  if (!smallScreen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%" minW="200px" zIndex={999}>
        <ModalBody textAlign="center">
          (╯°□°)╯︵ ┻━┻<Text my="5px"> Hey! We&apos;re still not quite there with mobile support for this page.</Text>
          <Text>
            Please use a <Text as="strong">desktop</Text> to get the best experience
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
