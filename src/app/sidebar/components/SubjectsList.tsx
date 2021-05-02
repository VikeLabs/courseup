import { LinkBox } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { Link, useSearchParams } from 'react-router-dom';

import { KualiSubject } from '../../../shared/fetchers';

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
  /**
   * Route that the subject clicked will go to
   * EX) calendar or scheduler
   */
  route: String;
};

export function SubjectsList({ term, subjects, route }: SubjectsListProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');

  return (
    <Collapse in style={{ overflowY: 'scroll' }}>
      {subjects.map((subject, index) => (
        <LinkBox
          as={Link}
          to={{
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
