import { Button, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { HStack, Spacer } from '@chakra-ui/layout';
import { GiHamburgerMenu } from 'react-icons/gi';

type Props = {
  handleSidebar: () => void;
};

export function HeaderMobile({ handleSidebar }: Props): JSX.Element {
  return (
    <HStack as="header" py="3" px="8" boxShadow="md" bg="#2e95d1" zIndex={100}>
      <Spacer />
      <Button
        as="a"
        href="https://vikelabs.ca/"
        target="_blank"
        bg="transparent"
        border="none"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        _focus={{ border: 'none' }}
        ml={5}
      >
        <Image src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="clockwork" h="40px" />
      </Button>
      <Spacer />
      <IconButton
        aria-label="hamburger"
        color="white"
        icon={<GiHamburgerMenu />}
        bgColor="rgba(255, 255, 255, 0)"
        onClick={handleSidebar}
      />
    </HStack>
  );
}
