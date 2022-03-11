import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps /*, AppContext */ } from 'next/app';

import { customTheme } from '../src/lib/theme';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default App;
