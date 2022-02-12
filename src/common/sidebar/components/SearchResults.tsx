import { LinkBox } from '@chakra-ui/react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';
import { Link, useMatch, useParams } from 'react-router-dom';

import { getCurrentTerm } from 'lib/utils/terms';

import { Card } from './Card';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = HitsProvided<CourseRecord>;

const SearchResults = ({ hits }: Props) => {
  const scheduleMatch = useMatch('/scheduler/*');
  const { term } = useParams();

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <LinkBox
          as={Link}
          to={`/calendar/${term || getCurrentTerm()}/${subject}?pid=${pid}`}
          data-pid={pid}
          key={objectID}
        >
          <Card subject={subject} title={title} pid={pid} code={code} schedule={scheduleMatch != null} />
        </LinkBox>
      ))}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
