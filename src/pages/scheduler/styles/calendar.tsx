import { CSSProperties } from 'react';

import { mode } from '@chakra-ui/theme-tools';

export const CalendarTheme = (colorMode: 'light' | 'dark'): CSSProperties => {
  const props = { colorMode };
  return {
    '.rbc-header': {
      bgColor: mode('#eff6ff', '#31363D')(props),
      padding: '1em',
    },

    '.rbc-time-header-gutter': {
      bgColor: mode('#eff6ff', '#31363D')(props),
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
      borderRight: mode('1px solid #ccc', '1px solid #31363D')(props),
    },

    '.rbc-day-slot .rbc-time-slot': {
      border: 'unset',
    },

    '.rbc-timeslot-group': {
      bgColor: mode('#fefefe', '#525558')(props),
      borderWidth: '0px',
      margin: 0,
      padding: 0,
    },

    '.rbc-time-header-content, .rbc-header, .rbc-events-container': {
      borderLeft: mode('1px solid #ccc !important', '1px solid #525558 !important')(props),
    },

    '.rbc-timeslot-group:nth-child(2n+1), .rbc-time-header.rbc-overflowing, .rbc-time-content': {
      borderTop: mode('1px solid #ccc', '1px solid #31363D')(props),
    },

    '.rbc-time-slot': {
      bgColor: 'transparent !important',
      minH: '1.85em',
    },

    '.rbc-day-slot .rbc-events-container': {
      margin: 0,
    },

    '.rbc-event': {
      padding: 0,
    },

    '.rbc-event-label': {
      display: 'none',
    },

    '.rbc-allday-cell': {
      display: 'none !important',
    },
  } as CSSProperties;
};
