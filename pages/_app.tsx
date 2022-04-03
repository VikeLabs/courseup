import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import algoliasearch from 'algoliasearch';
import type { AppProps /*, AppContext */ } from 'next/app';
import { InstantSearch } from 'react-instantsearch-core';
import { RestfulProvider } from 'restful-react';
import { supabase } from '../utils/supabaseClient';

import { customTheme } from '../src/lib/theme';
import { searchClient } from '../utils/algoliaClient';

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
