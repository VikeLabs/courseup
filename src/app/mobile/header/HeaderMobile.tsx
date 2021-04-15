import { IconButton } from '@chakra-ui/button';
import { HStack, Spacer, Text } from '@chakra-ui/layout';
import { GiHamburgerMenu } from 'react-icons/gi';

type Props = {
  handleSidebar: () => void;
};

export function HeaderMobile({ handleSidebar }: Props): JSX.Element {
  return (
    <HStack as="header" py="3" px="8" boxShadow="md" bg="white" zIndex={100}>
      <Spacer />
      <Text fontSize="x-large" fontWeight="bold">
        clockwork
      </Text>
      <Spacer />
      <IconButton
        aria-label="hamburger"
        icon={<GiHamburgerMenu />}
        bgColor="rgba(255, 255, 255, 0)"
        onClick={handleSidebar}
      />
    </HStack>
  );
}
