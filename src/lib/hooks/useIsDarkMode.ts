import { useColorMode } from '@chakra-ui/react';

export const useIsDarkMode = (): boolean => {
  const { colorMode } = useColorMode();

  return colorMode !== 'light';
};
