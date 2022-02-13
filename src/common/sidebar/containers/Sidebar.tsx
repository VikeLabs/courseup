import { Flex, useMediaQuery } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

export function Sidebar({ children }: { children: JSX.Element }): JSX.Element | null {
  const mode = useDarkMode();
  const [isMobile] = useMediaQuery('(max-width: 1020px)');

  return (
    <Flex
      bgColor={mode('light.background', 'dark.background')}
      w="25%"
      maxW={isMobile ? '100%' : '350px'}
      flexDirection="column"
      h="100%"
    >
      <Flex
        justifyContent="flex-start"
        height="100%"
        width="100%"
        overflowX="hidden"
        overflowY="auto"
        direction="column"
      >
        {children}
      </Flex>
    </Flex>
  );
}
