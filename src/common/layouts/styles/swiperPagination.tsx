import { CSSProperties } from 'react';

export const SwiperPaginationTheme = (): CSSProperties => {
  return {
    '.swiper-pagination-bullet': {
      borderRadius: 10,
      width: '50px',
      height: '10px',
      opacity: 1,
      backgroundColor: 'RGBA(0, 0, 0, 0.24)',
    },
    '.swiper-pagination-bullet-active': {
      backgroundColor: 'RGBA(0, 0, 0, 0.64)',
    },
  } as CSSProperties;
};
