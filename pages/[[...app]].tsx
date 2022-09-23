import { useEffect, useState } from 'react';

import type { AppProps /*, AppContext */ } from 'next/app';

import { App as CreateReactApp } from '../src/App';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div />;
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="msapplication-config" content="/public/assets/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="CourseUp" />
        <meta property="og:description" content="Browse and schedule UVic courses, simply." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://courseup.vikelabs.ca/" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image" content="https://courseup.vikelabs.dev/assets/laptop.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <CreateReactApp />
    </>
  );
}
export default App;
