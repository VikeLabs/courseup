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
  const router = useRouter();
  const { pid } = router.query;
  const route = router.pathname.split('/')[1];

  console.log(route, term, subjects)

  return (
    <Collapse in style={{ overflowY: 'scroll' }}>
      {subjects.map((subject, index) => (
        <Link
          href={{
            pathname: `/${route}/${term}/${subject.subject}`,
            search: pid ? `?pid=${pid}` : undefined,
          }}
          passHref
          key={index}
        >
          <LinkBox as="a">
            <Card subject={subject.subject} title={subject.title} />
          </LinkBox>
        </Link>
      ))}
    </Collapse>
  );
}
