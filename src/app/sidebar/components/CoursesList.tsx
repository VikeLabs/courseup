import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { Link, useParams } from 'react-router-dom';

import { Course } from '../../../shared/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  courses?: {
    [subject: string]: Course[];
  };
};

export function CoursesList({ term, courses }: CoursesListProps): JSX.Element | null {
  const { subject } = useParams();

  if (!courses || !courses[subject]) {
    return null;
  }

  return (
    <SlideFade in>
      {courses[subject].map(({ pid, code, subject, title }) => (
        <LinkBox key={pid} as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`} data-title={title}>
          <Card title={title} subject={subject} code={code} />
        </LinkBox>
      ))}
    </SlideFade>
  );
}
