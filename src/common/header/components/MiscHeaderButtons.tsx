import { IconButton } from '@chakra-ui/button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HStack, useColorMode } from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';

import { useDarkMode } from 'lib/hooks/useDarkMode';

export function MiscHeaderButtons(): JSX.Element {
  const { toggleColorMode } = useColorMode();
  const mode = useDarkMode();

  return (
    <HStack>
      <IconButton
        as="a"
        href="https://github.com/VikeLabs/courseup"
        target="_blank"
        size="sm"
        colorScheme="none"
        fontSize="2em"
        isRound
        aria-label="Open GitHub Repo"
        color={mode('gray.400', 'gray.300')}
        _hover={{
          color: mode('gray.500', 'gray.400'),
        }}
        icon={<AiFillGithub />}
      />
      <IconButton
        aria-label="toggle dark mode"
        isRound
        icon={mode(<MoonIcon fontSize="1.3em" />, <SunIcon fontSize="1.3em" />)}
        size="sm"
        onClick={toggleColorMode}
        colorScheme={mode('purple', 'orange')}
      />
    </HStack>
  );
}
