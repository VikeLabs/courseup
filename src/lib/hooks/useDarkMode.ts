import { useColorMode } from '@chakra-ui/react';

export const useDarkMode = (): (<T>(light: T, dark: T) => T) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode !== 'light';

  function mode<T>(light: T, dark: T): T {
    return isDarkMode ? dark : light;
  }

  return mode;
};
