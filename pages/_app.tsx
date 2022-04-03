import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import algoliasearch from 'algoliasearch';
import type { AppProps /*, AppContext */ } from 'next/app';
import { InstantSearch } from 'react-instantsearch-core';
import { RestfulProvider } from 'restful-react';
import { supabase } from '../utils/supabaseClient';

import { customTheme } from '../src/lib/theme';

const searchClient = algoliasearch('CR92D3S394', '5477854d63b676fe021f8f83f5839a3a');

// TODO: deprecate
const API_URL = 'https://courseup.vikelabs.dev/api';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider supabaseClient={supabase}>
      <ChakraProvider theme={customTheme}>
        <InstantSearch searchClient={searchClient} indexName="dev_uvic">
          <RestfulProvider base={API_URL}>
            <Component {...pageProps} />
          </RestfulProvider>
        </InstantSearch>
      </ChakraProvider>
    </UserProvider>
  );
}
export default App;
