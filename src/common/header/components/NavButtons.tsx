import { Button, ButtonGroup } from '@chakra-ui/react';
import { useMatch, useNavigate, useParams } from 'react-router';

import { getCurrentTerm } from 'lib/utils';

export function NavButtons(): JSX.Element {
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');

  const { term } = useParams();

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (!scheduleMatch && name !== 'calendar') {
      navigate(`/scheduler/${term || getCurrentTerm()}`);
    } else if (!calendarMatch && name !== 'scheduler') {
      navigate(`/calendar/${term || getCurrentTerm()}`);
    }
  };

  return (
    <ButtonGroup isAttached colorScheme="whiteAlpha" size="sm">
      <Button isActive={!!calendarMatch} colorScheme="purple" onClick={onClick} name="calendar">
        Courses
      </Button>
      <Button isActive={!!scheduleMatch} colorScheme="purple" onClick={onClick} name="scheduler">
        Timetable
      </Button>
    </ButtonGroup>
  );
}
