import { LinkBox } from '@chakra-ui/layout';
import { SlideFade } from '@chakra-ui/transition';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Course } from 'lib/fetchers';

import { Card } from './Card';

type CoursesListProps = {
  term: string;
  courses?: {
    [subject: string]: Course[];
  };
};

export function CoursesList({ term, courses }: CoursesListProps): JSX.Element | null {
  const router = useRouter();
  const { subject } = router.query;
  const scheduleMatch = router.pathname.startsWith('/scheduler');

  if (!courses || !courses[subject as string]) {
    return null;
  }

  const createCard = (pid: string, code: string, subject: string, title: string) => {
    if (!scheduleMatch)
      return (
        <LinkBox key={pid} as={Link} href={`/calendar/${term}/${subject}?pid=${pid}`} data-title={title}>
          <Card title={title} pid={pid} subject={subject} code={code} />
        </LinkBox>
      );
    else if (scheduleMatch) {
      return <Card key={pid} title={title} subject={subject} pid={pid} code={code} schedule />;
    }
  };

  return (
    <SlideFade in>
      {courses[subject as string].map(({ pid, code, subject, title }) => createCard(pid, code, subject, title))}
    </SlideFade>
  );
}
