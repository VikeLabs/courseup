import { useColorMode } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const useDarkMode = (): (<T>(light: T, dark: T) => T) => {
  const { colorMode } = useColorMode();

  const customMode = <T>(light: T, dark: T) => mode(light, dark)({ colorMode });

  return customMode;
};
