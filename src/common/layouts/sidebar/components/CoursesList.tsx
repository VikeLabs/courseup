import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import { Link, useMatch, useParams, useSearchParams } from 'react-router-dom';

import { Course } from 'lib/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  courses?: {
    [subject: string]: Course[];
  };
};

type LinkedCardProps = {
  pid: string;
  code: string;
  subject: string;
  title: string;
  term: string;
  scheduleMatch: boolean;
};

const LinkedCard = ({ pid, code, subject, title, term, scheduleMatch }: LinkedCardProps) => {
  const [searchParams] = useSearchParams();
  const pidParam = searchParams.get('pid');

  if (!scheduleMatch) {
    return (
      <LinkBox key={pid} as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`} data-title={title}>
        <Card title={title} pid={pid} subject={subject} code={code} selected={pid === pidParam} />
      </LinkBox>
    );
  } else {
    return (
      <Card key={pid} title={title} subject={subject} pid={pid} code={code} schedule selected={pid === pidParam} />
    );
  }
};

export function CoursesList({ term, courses }: CoursesListProps): JSX.Element | null {
  const { subject } = useParams();
  const scheduleMatch = useMatch('/scheduler/*');

  if (!courses || !courses[subject]) {
    return null;
  }

  return (
    <SlideFade in>
      {courses[subject].map(({ pid, code, subject, title }) => (
        <LinkedCard
          key={pid}
          pid={pid}
          code={code}
          subject={subject}
          title={title}
          term={term}
          scheduleMatch={scheduleMatch ? true : false}
        />
      ))}
    </SlideFade>
  );
}
