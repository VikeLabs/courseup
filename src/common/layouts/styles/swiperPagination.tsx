import { CSSProperties } from 'react';

import { mode } from '@chakra-ui/theme-tools';

export const SwiperPaginationTheme = (colorMode: 'light' | 'dark'): CSSProperties => {
  const props = { colorMode };
  return {
    '.swiper-pagination-bullet': {
      borderRadius: 10,
      width: '50px',
      height: '10px',
      opacity: 1,
      backgroundColor: mode('RGBA(0, 0, 0, 0.24)', 'RGBA(255, 255, 255, 0.30)')(props),
    },
    '.swiper-pagination-bullet-active': {
      backgroundColor: mode('RGBA(0, 0, 0, 0.64)', 'RGBA(255, 255, 255, 0.75)')(props),
    },
  } as CSSProperties;
};
