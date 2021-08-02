import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import { CalendarTheme } from 'pages/calendar/styles/calendar';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const customTheme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      ':focus:not(:focus-visible)': {
        boxShadow: 'none !important',
      },
      ...CalendarTheme(props.colorMode),
    }),
  },
});
