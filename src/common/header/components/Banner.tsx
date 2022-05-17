import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Alert, AlertDescription, Center, CloseButton, Collapse, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';

function TipNav({ onClick, icon }: { onClick: () => void; icon: JSX.Element }): JSX.Element {
  return (
    <IconButton
      aria-label="cycle tip"
      className="expand-focus"
      icon={icon}
      bgColor="transparent"
      _hover={{
        bgColor: 'transparent',
        color: '#707070',
      }}
      size="lg"
      h="fit-content"
      mx={2}
      onClick={onClick}
      _focusVisible={{ boxShadow: 'none', color: 'rgb(19, 135, 243)', fontSize: '1.5rem' }}
    />
  );
}

export function Banner(): JSX.Element {
  const [banner, setBanner] = useSessionStorage('user:banner', true);
  const [tipIndex, setTipIndex] = useState(0);

  const tips: Array<JSX.Element> = [
    <Text>
      📅 The{' '}
      <Text as={Link} to="/calendar/202209" textDecoration="underline">
        Fall 2022
      </Text>{' '}
      and{' '}
      <Text as={Link} to="/calendar/202301" textDecoration="underline">
        Spring 2023
      </Text>{' '}
      calendars are now available. Happy scheduling!
    </Text>,
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTipIndex((tipIndex + 1) % tips.length);
    }, 2 * 60 * 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [tipIndex, tips.length]);
  const back = () => {
    tipIndex - 1 < 0 ? setTipIndex(tips.length - 1) : setTipIndex(tipIndex - 1);
  };

  const forward = () => {
    setTipIndex((tipIndex + 1) % tips.length);
  };

  return (
    <Collapse in={banner} animateOpacity>
      <Alert status="info" alignItems="center" justifyContent="center" variant="solid" color="black">
        {tips.length > 1 && <TipNav onClick={back} icon={<ChevronLeftIcon />} />}
        <Center w="1100px">
          <AlertDescription>{tips[tipIndex]}</AlertDescription>
        </Center>
        {tips.length > 1 && <TipNav onClick={forward} icon={<ChevronRightIcon />} />}
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => {
            setBanner(false);
          }}
          _focusVisible={{ boxShadow: 'none', color: 'rgb(19, 135, 243)', fontSize: '1.2rem' }}
        />
      </Alert>
    </Collapse>
  );
}
