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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBh3shP0neAHQCRrESGjQVfKpCdz2EbSEE',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'staging-clockwork.firebaseapp.com',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || 'https://staging-clockwork-default-rtdb.firebaseio.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'staging-clockwork',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'staging-clockwork.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '53599730639',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:53599730639:web:f31b0eeaf4f0529233f0ba',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-M645REB5LQ',
};

Sentry.init({
  dsn: 'https://08218d366eab4945abe3e09054bc5cce@o551348.ingest.sentry.io/5674718',
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// only enable Firebase if the required config values are present
if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ANALYTICS) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <RestfulProvider base={'/api'}>
        <InstantSearch searchClient={searchClient} indexName="dev_uvic">
          <ChakraProvider portalZIndex={999}>
            <Helmet titleTemplate="%s · CourseUp" defaultTitle="CourseUp · We make school easier" />
            <Mobile />
            <Routes />
          </ChakraProvider>
        </InstantSearch>
      </RestfulProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(({ id, name, value }) => {
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ANALYTICS) {
    firebase.analytics().logEvent('Web Vitals', {
      eventCategory: 'Web Vitals',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate
    });
  }
});
