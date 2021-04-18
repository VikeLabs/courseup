import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { Link } from 'react-router-dom';

import { Course } from '../../../shared/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  courses?: Course[];
};

export function CoursesList({ term, courses }: CoursesListProps): JSX.Element | null {
  if (!courses) {
    return null;
  }

  return (
    <SlideFade in>
      {courses.map(({ pid, code, subject, title }) => (
        <LinkBox key={pid} as={Link} to={`/calendar/${term}/${subject}/${code}?pid=${pid}`} data-title={title}>
          <Card title={title} subject={subject} code={code} />
        </LinkBox>
      ))}
    </SlideFade>
  );
}
