import { Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';

// TODO: real mobile functionality
export function Mobile(): JSX.Element | null {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  if (!isMobile) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="90%" minW="200px" zIndex={999}>
        <ModalBody textAlign="center">
          (╯°□°)╯︵ ┻━┻<Text my="5px"> Hey! We're still not quite there with mobile support.</Text>
          <Text>
            Please use a <Text as="strong">tablet</Text> or <Text as="strong">desktop</Text> to get the best experience
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
