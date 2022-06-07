import { Flex, Text } from '@chakra-ui/react';

import { useDarkMode } from 'lib/hooks/useDarkMode';

export function ScreenshotFooter(): JSX.Element {
  const mode = useDarkMode();

  return (
    <Flex
      id="screenshotFooter"
      px="3"
      pt="1"
      pb="5"
      alignItems={'center'}
      gap={1}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      bgColor={mode('blue.200', 'blue.800')}
      visibility={'hidden'}
    >
      <Flex alignItems={'center'} gap={1.5}>
        <Text fontSize={'sm'}>
          CourseUp built by students @
          <Text as="span" fontWeight="bolder" fontSize={'sm'} color={mode('light.brand', 'dark.brand')}>
            VIKE LABS
          </Text>
        </Text>
      </Flex>
      <Text fontSize={'sm'}>
        <a href="https://courseup.vikelabs.ca" target={'_blank'}>
          https://courseup.vikelabs.ca
        </a>
      </Text>
    </Flex>
  );
}
