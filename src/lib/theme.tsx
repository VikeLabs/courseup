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

      '.rbc-time-view, .rbc-time-view *': {
        border: 'unset',
      },

      '.rbc-time-header.rbc-overflowing': {
        borderRight: mode('1px solid #ccc', '1px solid rgb(49, 54, 61)')(props),
      },

      '.rbc-day-slot .rbc-time-slot': {
        border: 'unset',
      },
      '.rbc-timeslot-group': {
        bgColor: mode('#fefefe', 'rgb(82, 85, 88)')(props),
        borderWidth: '0px',
        margin: 0,
        padding: 0,
      },

      '.rbc-time-header-content, .rbc-header, .rbc-events-container': {
        borderLeft: mode('1px solid #ccc !important', '1px solid rgb(82, 85, 88) !important')(props),
      },

      '.rbc-timeslot-group:nth-child(2n+1), .rbc-time-header.rbc-overflowing, .rbc-time-content': {
        borderTop: mode('1px solid #ccc', '1px solid rgb(49, 54, 61)')(props),
      },
    }),
  },
});
