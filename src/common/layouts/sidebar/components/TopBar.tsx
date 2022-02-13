import { PropsWithChildren } from 'react';

import { Box, Button, ButtonProps, Flex, Text } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

type Props = {
  buttonName?: string;
  buttonProps?: ButtonProps;
};

export function TopBar({ children, buttonName, buttonProps }: PropsWithChildren<Props>): JSX.Element {
  const mode = useDarkMode();

  return (
    <Box
      bgColor={mode('white', 'dark.main')}
      top="0"
      m="0"
      boxShadow="md"
      zIndex={10}
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Flex justifyContent="space-between" alignItems="center" p="3">
        {typeof children === 'string' ? <Text>{children}</Text> : { children }}
        {buttonName && (
          <Box>
            <Button size="xs" {...buttonProps}>
              {buttonName}
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
