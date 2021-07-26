import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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

      '.background': {
        bgColor: mode('#E4E4E4', '#151922')(props),
      },

      '.card': {
        bgColor: mode('white', '#1a202c')(props),
      },

      '.section': {
        bgColor: mode('white', '#151922')(props),
      },

      '.rbc-header': {
        bgColor: mode('#eff6ff', 'rgb(49, 54, 61)')(props),
        padding: '1em',
      },

      '.rbc-time-header-gutter': {
        bgColor: mode('#eff6ff', 'rgb(49, 54, 61)')(props),
      },

      '.rbc-time-gutter .rbc-timeslot-group': {
        color: '#f5f5f5',
      },

      '.rbc-time-gutter .rbc-timeslot-group:nth-child(even)': {
        bgColor: '#686868',
      },

      '.rbc-time-gutter .rbc-timeslot-group:nth-child(odd)': {
        bgColor: '#4e4e4e',
      },
    }),
  },

  // colors: {
  //   light: {
  //     background: mode('#e4e4e4', 'blue'),
  //   },
  //   dark: {
  //     background: 'blue',
  //   },
  // },
});
