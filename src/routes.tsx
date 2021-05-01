import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { useEffect } from 'react';
import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { Calendar } from './pages/calendar';
import { Home } from './pages/home';
import { Scheduler } from './pages/scheduler/scheduler';

// For our lack of mobile support :-)
function Mobile(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

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

// TODO: use nested routes but it doesn't work right now
export function Routes(): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <BrowserRouter>
      {isMobile && <Mobile />}
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:term/*" element={<Calendar />} />
        <Route path="/schedule/*" element={<Scheduler />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
