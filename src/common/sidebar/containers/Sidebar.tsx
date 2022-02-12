import { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

type Props = {
  topBar?: JSX.Element;
};

export function Sidebar({ topBar, children }: PropsWithChildren<Props>): JSX.Element | null {
  const mode = useDarkMode();

  return (
    <Flex bgColor={mode('light.background', 'dark.background')} minW="20%" maxW="20%" flexDirection="column" h="100%">
      {/* <TopBar onFilter={handleFilter} /> */}
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
