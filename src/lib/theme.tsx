import { extendTheme } from '@chakra-ui/react';

export const overrides = extendTheme({
  styles: {
    global: (props) => ({
      ':focus:not(:focus-visible)': {
        boxShadow: 'none !important',
      },
    }),
  },
});
