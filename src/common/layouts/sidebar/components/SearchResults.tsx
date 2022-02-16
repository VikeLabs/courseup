import { LinkBox } from '@chakra-ui/react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';
import { Link, useMatch } from 'react-router-dom';

import { Card } from './Card';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = { term: string } & HitsProvided<CourseRecord>;

const SearchResults = ({ hits, term }: Props) => {
  const scheduleMatch = useMatch('/scheduler/*');

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) =>
        scheduleMatch ? (
          <Card subject={subject} title={title} pid={pid} code={code} schedule />
        ) : (
          <LinkBox as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`} data-pid={pid} key={objectID}>
            <Card subject={subject} title={title} pid={pid} code={code} />
          </LinkBox>
        )
      )}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
