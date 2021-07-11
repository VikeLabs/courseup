import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import 'firebase/analytics';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import algoliasearch from 'algoliasearch';
import firebase from 'firebase/app';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { InstantSearch } from 'react-instantsearch-dom';
import { RestfulProvider } from 'restful-react';

import { Section } from 'lib/fetchers';
import { SavedSection } from 'lib/hooks/useSavedCourses';
import { customTheme } from 'lib/theme';
import { migrateLocalStorage } from 'lib/utils/localStorageMigration';

import { Feedback } from 'common/feedback';
import { Mobile } from 'common/mobile';

import reportWebVitals from './reportWebVitals';
import { Routes } from './routes';

import './index.css';

export type OldCourse = {
  subject: string;
  pid: string;
  code: string;
  term: string;
  sections: Section[];
  selected?: boolean;
  color?: string;
  textColor?: string;
  lecture?: SavedSection;
  lab?: SavedSection;
  tutorial?: SavedSection;
};

const firebaseConfig =
  process.env.REACT_APP_ENV === 'production'
    ? {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      }
    : {
        apiKey: 'AIzaSyBh3shP0neAHQCRrESGjQVfKpCdz2EbSEE',
        authDomain: 'staging-clockwork.firebaseapp.com',
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
  release: process.env.REACT_APP_SENTRY_RELEASE,
});

// only enable Firebase if the required config values are present
if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ANALYTICS) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

migrateLocalStorage();

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <RestfulProvider base={'/api'}>
        <InstantSearch searchClient={searchClient} indexName="dev_uvic">
          <ChakraProvider portalZIndex={999} theme={customTheme}>
            <Helmet titleTemplate="%s · CourseUp" defaultTitle="CourseUp · We make school easier" />
            <Mobile />
            <Routes />
            <Feedback />
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
  logEvent('Web Vitals', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
});

export function logEvent(
  eventName: string,
  eventParams?:
    | {
        [key: string]: any;
      }
    | undefined,
  options?: firebase.analytics.AnalyticsCallOptions | undefined
): void {
  if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ANALYTICS) {
    firebase.analytics().logEvent(eventName, eventParams);
  }
}
