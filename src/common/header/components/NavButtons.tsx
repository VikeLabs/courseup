'use client';
import { Button, ButtonGroup, VStack, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdConfirmationNumber, MdLibraryBooks, MdOutlineCalendarViewMonth, MdOutlineConfirmationNumber, MdOutlineLibraryBooks, MdOutlineTravelExplore } from 'react-icons/md';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getCurrentTerm } from 'lib/utils/terms';

export function NavButtons(): JSX.Element {
  const router = useRouter();
  const { term } = router.query;

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (name === 'explore') {
      router.push(`/explore`);
    } else if (name === 'scheduler') {
      router.push(`/scheduler/${term || getCurrentTerm()}`);
    } else if (name === 'register') {
      router.push(`/registration/${term || getCurrentTerm()}`);
    } else if (name === 'booklist') {
      router.push(`/booklist/${term || getCurrentTerm()}`);
    }
  };

  return (
    <>
      <ButtonGroup isAttached variant="ghost">
        <Button onClick={onClick} name="explore" leftIcon={<MdOutlineTravelExplore />}>
          Explore courses
        </Button>
        <Button onClick={onClick} name="scheduler" leftIcon={<MdOutlineCalendarViewMonth />}>
          Timetables
        </Button>
        <Button onClick={onClick} name="register" leftIcon={<MdOutlineConfirmationNumber />}>
          Register
        </Button>
        <Button onClick={onClick} name="booklist" leftIcon={<MdOutlineLibraryBooks />}>
          Booklist
        </Button>
      </ButtonGroup>
    </>
  );
}
