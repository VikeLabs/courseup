import { useCallback, useEffect, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Alert, AlertDescription, Center, CloseButton, Collapse, IconButton } from '@chakra-ui/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';

type Props = {
  onClick: () => void;
  icon: JSX.Element;
};

function TipButton({ onClick, icon }: Props): JSX.Element | null {
  return (
    <IconButton
      aria-label="change tip"
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

export function Banner(): JSX.Element | null {
  const [banner, setBanner] = useSessionStorage('user:banner', true);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    '💡 Your courses and sections are saved between sessions, no need to leave the tab open!',
    "💡 Press the 'Register' button while viewing your timetable to help you quickly register for classes!",
    "💡 See something you don't like or think might be a bug? Send feedback to the team via the button at the bottom right!",
    '💡 Courses that appear transparent on your timetable mean that section happens during that time, but not during the week you are viewing.',
    "⚠️ We're in beta right now so expect things to be a bit rocky. ⚠️",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTipIndex((tipIndex + 1) % tips.length);
    }, 2 * 60 * 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [tipIndex, tips.length]);

  const back = useCallback(() => {
    tipIndex - 1 < 0 ? setTipIndex(tips.length - 1) : setTipIndex(tipIndex - 1);
  }, [tipIndex, tips.length]);

  const forward = useCallback(() => {
    setTipIndex((tipIndex + 1) % tips.length);
  }, [tipIndex, tips.length]);

  return (
    <Collapse in={banner} animateOpacity>
      <Alert status="success" alignItems="center" justifyContent="center" variant="solid">
        <TipButton onClick={back} icon={<ChevronLeftIcon />} />
        <Center w="1100px">
          <AlertDescription>{`${tips[tipIndex]}`}</AlertDescription>
        </Center>
        <TipButton onClick={forward} icon={<ChevronRightIcon />} />
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
