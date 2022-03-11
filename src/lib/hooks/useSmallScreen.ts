import { useMediaQuery } from '@chakra-ui/react';

export const useSmallScreen = (): boolean => {
  const [smallScreen] = useMediaQuery('(max-width: 1020px)');
  return smallScreen;
};
