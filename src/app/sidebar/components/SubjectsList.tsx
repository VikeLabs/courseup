import { LinkBox } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { Link } from 'react-router-dom';

import { KualiSubject } from '../../../shared/fetchers';

import { Card } from './Card';

type SubjectsListProps = {
  term: string;
  subjects: KualiSubject[];
};

export function SubjectsList({ term, subjects }: SubjectsListProps): JSX.Element {
  return (
    <Collapse in style={{ overflowY: 'scroll' }}>
      {subjects.map((subject, index) => (
        <LinkBox as={Link} to={`/calendar/${term}/${subject.subject}`} data-subject={subject.subject} key={index}>
          <Card subject={subject.subject} title={subject.title} />
        </LinkBox>
      ))}
    </Collapse>
  );
}
