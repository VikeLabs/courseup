import { ChakraProvider } from '@chakra-ui/react';
import 'firebase/analytics';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import algoliasearch from 'algoliasearch';
import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { InstantSearch } from 'react-instantsearch-dom';
import { RestfulProvider } from 'restful-react';

import { Mobile } from './app/mobile';
import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';

import './index.css';

const firebaseConfigStaging = {
  apiKey: 'AIzaSyBh3shP0neAHQCRrESGjQVfKpCdz2EbSEE',
  authDomain: 'staging-clockwork.firebaseapp.com',
  databaseURL: 'https://staging-clockwork-default-rtdb.firebaseio.com',
  projectId: 'staging-clockwork',
  storageBucket: 'staging-clockwork.appspot.com',
  messagingSenderId: '53599730639',
  appId: '1:53599730639:web:f31b0eeaf4f0529233f0ba',
  measurementId: 'G-M645REB5LQ',
};

Sentry.init({
  dsn: 'https://08218d366eab4945abe3e09054bc5cce@o551348.ingest.sentry.io/5674718',
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

firebase.initializeApp(firebaseConfigStaging);

firebase.analytics();

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

// The base URL used for all REST api requests.
// TODO: switch
const base = process.env.NODE_ENV === 'production' ? '/api' : 'https://clockwork.vikelabs.dev/api';

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={base}>
      <InstantSearch searchClient={searchClient} indexName="dev_uvic">
        <ChakraProvider portalZIndex={999}>
          <Helmet titleTemplate="%s · CourseUp" defaultTitle="CourseUp · We make school easier" />
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
