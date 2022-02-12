import { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

type Props = {
  topBar?: JSX.Element;
};

export function Sidebar({ topBar, children }: PropsWithChildren<Props>): JSX.Element | null {
  const mode = useDarkMode();

  return (
    <Flex bgColor={mode('light.background', 'dark.background')} minW="20%" maxW="20%" flexDirection="column">
      {/* <TopBar onFilter={handleFilter} /> */}
      <Flex justifyContent="flex-start" height="100%" width="100%" overflow="hidden" direction="column">
        <Flex direction="column" overflowY="auto">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
