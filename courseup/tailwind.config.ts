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
  // daisyui: {
  //   themes: [
  //     {
  //       courseup: {
  //         primary: '#00b3ff',
  //         secondary: '#f9aa00',
  //         accent: '#00e9c2',
  //         neutral: '#1f1a29',
  //         'base-100': '#fffdd7',
  //         info: '#00f2ff',
  //         success: '#7cb900',
  //         warning: '#f36500',
  //         error: '#e70048',
  //       },
  //     },
  //   ],
  // },
};
export default config;
