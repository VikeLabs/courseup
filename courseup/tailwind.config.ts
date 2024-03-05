import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  //TODO: we need to figure out colors to use for daisyui theming (this one is randomly generated)
  daisyui: {
    themes: [
      {
        courseupLight: {
          primary: '#00c0c3',
          secondary: '#00a37d',
          accent: '#00c46b',
          neutral: '#1d1b10',
          'base-100': '#fff5fb',
          info: '#009adf',
          success: '#51a500',
          warning: '#ffb042',
          error: '#f5003d',
        },
        courseupDark: {
          primary: '#008aff',
          secondary: '#2300ff',
          accent: '#009a00',
          neutral: '#B0C3DA',
          'base-100': '#151922',
          info: '#0089de',
          success: '#00ab57',
          warning: '#e0ae00',
          error: '#ff7e96',
        },
      },
    ],
  },
};
export default config;
