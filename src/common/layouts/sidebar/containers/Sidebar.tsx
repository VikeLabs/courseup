import { Flex } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

export function Sidebar({ children }: { children: JSX.Element }): JSX.Element | null {
  const mode = useDarkMode();
  const smallScreen = useSmallScreen();

  return (
    <Flex
      bgColor={mode('light.background', 'dark.background')}
      minW={smallScreen ? '100%' : '20%'}
      maxW={smallScreen ? '100%' : '20%'}
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
