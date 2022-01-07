import { Button, ButtonGroup, useMediaQuery, VStack, Divider } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { getCurrentTerm } from 'lib/utils/terms';

export function NavButtons(): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
  const { term } = useParams();

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (name === 'calendar') {
      navigate(`/calendar/${term || getCurrentTerm()}`);
    } else if (name === 'scheduler') {
      navigate(`/scheduler/${term || getCurrentTerm()}`);
    } else if (name === 'register') {
      navigate(`/registration/${term || getCurrentTerm()}`);
    } else if (name === 'booklist') {
      navigate(`/booklist/${term || getCurrentTerm()}`);
    }
  };

  return (
    <>
      {isMobile ? (
        <ButtonGroup isAttached variant="ghost" w="100%" data-testid="mobile-nav">
          <VStack w="100%">
            <Button onClick={onClick} name="calendar" w="100%">
              Explore courses
            </Button>
            <Divider />
            <Button onClick={onClick} name="scheduler" w="100%">
              Timetable
            </Button>
            <Divider />
            <Button onClick={onClick} name="register" w="100%">
              Register
            </Button>
            <Divider />
            <Button onClick={onClick} name="booklist" w="100%">
              Booklist
            </Button>
            <Divider />
          </VStack>
        </ButtonGroup>
      ) : (
        <ButtonGroup isAttached variant="ghost">
          <Button onClick={onClick} name="calendar">
            Explore courses
          </Button>
          <Button onClick={onClick} name="scheduler">
            Timetable
          </Button>
          <Button onClick={onClick} name="register">
            Register
          </Button>
          <Button onClick={onClick} name="booklist">
            Booklist
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}
