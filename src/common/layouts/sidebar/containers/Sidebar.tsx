import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

export function Sidebar({
  children,
  side,
  title,
}: {
  children: JSX.Element;
  side?: 'left' | 'right';
  title?: string;
}): JSX.Element | null {
  const mode = useDarkMode();
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  //console.log(title);

  return (
    <>
      {!isMobile ? (
        <Flex
          bgColor={mode('light.background', 'dark.background')}
          minW={isMobile ? '100%' : '20%'}
          maxW={isMobile ? '100%' : '20%'}
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
      ) : (
        <>
          <Button onClick={onOpen}>{title || side === 'left' ? '<' : '>'}</Button>
          <Drawer size="lg" isOpen={isOpen} placement={side} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
