import { useMediaQuery } from '@chakra-ui/react';

export const useSmallScreen = (): boolean => {
  // Min-width is in-line with Chakra media queries
  const [bigScreen] = useMediaQuery('(min-width: 1020px)');
  return !bigScreen;
};
