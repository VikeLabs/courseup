import { useMediaQuery } from '@chakra-ui/react';

export const useSmallScreen = (): boolean => {
  const [bigScreen] = useMediaQuery('(min-width: 1020px)');
  return !bigScreen;
};
