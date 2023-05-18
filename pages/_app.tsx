import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch';
import type { AppProps /*, AppContext */ } from 'next/app';
// React Big Calendar
import { Helmet } from 'react-helmet';
import 'react-big-calendar/lib/sass/styles.scss';
import { InstantSearch } from 'react-instantsearch-core';
import '../src/index.css';
import { RestfulProvider } from 'restful-react';

import { customTheme } from 'lib/theme';
const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RestfulProvider base={'/api/v0'}>
      <InstantSearch searchClient={searchClient} indexName="dev_uvic">
        <ChakraProvider portalZIndex={999} theme={customTheme}>
          <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
          <Helmet titleTemplate="%s · CourseUp" defaultTitle="CourseUp · We make school easier" />
          <Component {...pageProps} />;
        </ChakraProvider>
      </InstantSearch>
    </RestfulProvider>
  );
}
export default App;
