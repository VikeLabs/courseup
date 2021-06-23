import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  styles: {
    global: () => ({
      ':focus:not(:focus-visible)': {
        boxShadow: 'none !important',
      },
    }),
  },
});
