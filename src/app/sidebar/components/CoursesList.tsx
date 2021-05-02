import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { Link, useParams } from 'react-router-dom';

import { Course } from '../../../shared/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  route: string;
  courses?: {
    [subject: string]: Course[];
  };
};

export function CoursesList({ term, courses, route }: CoursesListProps): JSX.Element | null {
  const { subject } = useParams();

  const createCard = (pid: string, code: string, subject: string, title: string) => {
    if (route.includes('calendar'))
      return (
        <LinkBox key={pid} as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`} data-title={title}>
          <Card title={title} subject={subject} code={code} />
        </LinkBox>
      );
    else if (route.includes('scheduler')) {
      return <Card title={title} subject={subject} code={code} schedule={true} />;
    }
  };

  if (!courses || !courses[subject]) {
    return null;
  }

  return (
    <SlideFade in>
      {courses[subject].map(({ pid, code, subject, title }) => createCard(pid, code, subject, title))}
    </SlideFade>
  );
}
