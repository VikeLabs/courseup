import { Button, ButtonGroup } from '@chakra-ui/react';
import { useMatch, useNavigate, useParams } from 'react-router';

export function NavButtons(): JSX.Element {
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');

  const { term } = useParams();

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (!scheduleMatch && name !== 'calendar') {
      navigate(`/schedule/${term || ''}`);
    } else if (!calendarMatch && name !== 'scheduler') {
      navigate(`/calendar/${term || ''}`);
    }
  };

  return (
    <ButtonGroup spacing="0" colorScheme="whiteAlpha" size="sm" isAttached>
      <Button isActive={!!calendarMatch} color="black" borderRadius="2px" onClick={onClick} name="calendar">
        Courses
      </Button>
      <Button isActive={!!scheduleMatch} color="black" borderRadius="2px" onClick={onClick} name="scheduler">
        Timetable
      </Button>
    </ButtonGroup>
  );
}
