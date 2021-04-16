import { IconButton } from '@chakra-ui/button';
import { Center, VStack } from '@chakra-ui/layout';
import { VscChromeClose } from 'react-icons/vsc';

import { Search } from '../../header/components/SearchBar';
import { TermButtons } from '../../header/components/TermButtons';

type Props = {
  handleSidebar: () => void;
  onSearchChange?: (query: string) => void;
};

export function HeaderSearch({ handleSidebar, onSearchChange }: Props): JSX.Element {
  return (
    <VStack as="header" py="3" px="8" boxShadow="md" bg="#2e95d1" zIndex={100}>
      <Center>
        <Search onChange={onSearchChange} />
      </Center>
      <TermButtons />
      <IconButton
        aria-label="hamburger"
        color="white"
        size="lg"
        icon={<VscChromeClose />}
        bgColor="rgba(255, 255, 255, 0)"
        onClick={handleSidebar}
      />
    </VStack>
  );
}
