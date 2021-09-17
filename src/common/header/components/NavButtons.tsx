import { CalendarIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { IoBook } from 'react-icons/io5';
import { useMatch, useNavigate, useParams } from 'react-router';

export function NavButtons(): JSX.Element {
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');

  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  const { term } = useParams();

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (!scheduleMatch && name !== 'calendar') {
      navigate(`/scheduler/${term || ''}`);
    } else if (!calendarMatch && name !== 'scheduler') {
      navigate(`/calendar/${term || ''}`);
    }
  };

  return (
    <ButtonGroup isAttached colorScheme="whiteAlpha" size="sm">
      {isLargerThan1200 ? (
        <>
          <Button
            isActive={!!calendarMatch}
            colorScheme="purple"
            onClick={onClick}
            name="calendar"
            leftIcon={<IoBook />}
          >
            Courses
          </Button>
          <Button
            isActive={!!scheduleMatch}
            colorScheme="purple"
            onClick={onClick}
            name="scheduler"
            leftIcon={<CalendarIcon />}
          >
            Timetable
          </Button>
        </>
      ) : (
        <>
          <IconButton
            aria-label="courses"
            isActive={!!calendarMatch}
            colorScheme="purple"
            onClick={onClick}
            name="calendar"
            icon={<IoBook />}
          />
          <IconButton
            aria-label="timetable"
            isActive={!!scheduleMatch}
            colorScheme="purple"
            onClick={onClick}
            name="scheduler"
            icon={<CalendarIcon />}
          />
        </>
      )}
    </ButtonGroup>
  );
}
