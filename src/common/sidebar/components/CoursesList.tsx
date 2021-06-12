import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { Link, useMatch, useParams } from 'react-router-dom';

import { Course } from '../../../lib/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  courses?: {
    [subject: string]: Course[];
  };
};

export function CoursesList({ term, courses }: CoursesListProps): JSX.Element | null {
  const { subject } = useParams();
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/scheduler/*');

  if (!courses || !courses[subject]) {
    return null;
  }

  const createCard = (pid: string, code: string, subject: string, title: string) => {
    if (calendarMatch)
      return (
        <LinkBox key={pid} as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`} data-title={title}>
          <Card title={title} pid={pid} subject={subject} code={code} />
        </LinkBox>
      );
    else if (scheduleMatch) {
      return <Card key={pid} title={title} subject={subject} pid={pid} code={code} schedule={true} />;
    }
  };

  return (
    <SlideFade in>
      {courses[subject].map(({ pid, code, subject, title }) => createCard(pid, code, subject, title))}
    </SlideFade>
  );
}
