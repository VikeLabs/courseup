import { useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Alert, AlertDescription, Center, CloseButton, Collapse, IconButton, Text } from '@chakra-ui/react';

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
    <Text>💡 Your courses and sections are saved between sessions, no need to leave the tab open!</Text>,
    <Text>
      💡 Press the <Text as="strong">Register</Text> button while viewing your timetable to help you quickly register
      for classes!
    </Text>,
    <Text>
      💡 See something you don't like or think might be a bug? Send feedback to the team via the button at the bottom
      right!
    </Text>,
    <Text>
      💡 Courses that appear transparent on your timetable mean that section happens during that time, but not during
      the week you are viewing.
    </Text>,
    <Text>⚠️ We're in beta right now so expect things to be a bit rocky.</Text>,
    <Text>
      💬 Join in on the discussion or ask questions on the{' '}
      <Text as="a" href="https://discord.com/invite/ZhpnafrxKQ" fontWeight="bold" textDecoration="underline">
        VikeLabs Discord channel
      </Text>
      !
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
      <Alert status="success" alignItems="center" justifyContent="center" variant="solid">
        <TipNav onClick={back} icon={<ChevronLeftIcon />} />
        <Center w="1100px">
          <AlertDescription>{tips[tipIndex]}</AlertDescription>
        </Center>
        <TipNav onClick={forward} icon={<ChevronRightIcon />} />
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => setBanner(false)}
          _focusVisible={{ boxShadow: 'none', color: 'rgb(19, 135, 243)', fontSize: '1.2rem' }}
        />
      </Alert>
    </Collapse>
  );
}
