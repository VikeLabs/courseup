import { LinkBox } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { KualiSubject } from 'lib/fetchers';

import { Card } from './Card';

type SubjectsListProps = {
  /**
   * Term to be displayed
   */
  term: string;
  /**
   * Subject to be displayed
   * EX) SENG 265 -> SENG
   */
  subjects: KualiSubject[];
};

export function SubjectsList({ term, subjects }: SubjectsListProps): JSX.Element {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const pid = urlSearchParams.get('pid');
  const router = useRouter();

  const route = location.pathname.split('/')[1];

  return (
    <Collapse in style={{ overflowY: 'scroll' }}>
      {subjects.map((subject, index) => (
        <LinkBox
          as={Link}
          href={{
            pathname: `/${route}/${term}/${subject.subject}`,
            search: pid ? `?pid=${pid}` : undefined,
          }}
          key={index}
        >
          <Card subject={subject.subject} title={subject.title} />
        </LinkBox>
      ))}
    </Collapse>
  );
}
