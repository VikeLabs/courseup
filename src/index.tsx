import {
  ChakraProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import algoliasearch from 'algoliasearch';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { InstantSearch } from 'react-instantsearch-dom';
import { RestfulProvider } from 'restful-react';

import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';

import './index.css';

Sentry.init({
  dsn: 'https://08218d366eab4945abe3e09054bc5cce@o551348.ingest.sentry.io/5674718',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

function Mobile(): JSX.Element | null {
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

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={process.env.NODE_ENV === 'production' ? '/api' : 'https://clockwork.vikelabs.dev/api'}>
      <InstantSearch searchClient={searchClient} indexName="dev_uvic">
        <ChakraProvider portalZIndex={999}>
          <Helmet titleTemplate="%s · clockwork" defaultTitle="clockwork · We make school easier" />
          <Mobile />
          <Routes />
        </ChakraProvider>
      </InstantSearch>
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
