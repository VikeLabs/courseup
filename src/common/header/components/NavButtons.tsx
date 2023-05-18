import { Button, ButtonGroup, VStack, Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { getCurrentTerm } from 'lib/utils/terms';

export function NavButtons(): JSX.Element {
  const smallScreen = useSmallScreen();
  const router = useRouter();
  const { term } = router.query;
  // const { term } = useParams();

  // const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const name = event.currentTarget.getAttribute('name');
    if (name === 'calendar') {
      router.push(`/calendar/${term || getCurrentTerm()}`);
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
      {smallScreen ? (
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
