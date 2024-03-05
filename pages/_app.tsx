// React Big Calendar
import 'react-big-calendar/lib/sass/styles.scss';
import '../src/index.css';

import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch';
import type { AppProps /*, AppContext */ } from 'next/app';
import { Helmet } from 'react-helmet';
import { InstantSearch } from 'react-instantsearch-core';
import { RestfulProvider } from 'restful-react';

import { customTheme } from 'lib/theme';

import { Header } from 'common/header';

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <RestfulProvider base={'/api/v0'}>
        <InstantSearch searchClient={searchClient} indexName="dev_uvic">
        <ChakraProvider theme={customTheme}>
          <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
          <Helmet titleTemplate="%s · CourseUp" defaultTitle="CourseUp · We make school easier" />
          <Flex direction='column' pos="relative" h='100%'>
            <Header />
            <Component {...pageProps} />
          </Flex>
        </ChakraProvider>
        </InstantSearch>
      </RestfulProvider>
  );
}
export default App;
