import { LinkBox } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';
import { useMatch, useSearchParams } from 'react-router-dom';

import { Card } from './Card';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = HitsProvided<CourseRecord>;

const SearchResults = ({ hits }: Props) => {
  const [, setSearchParams] = useSearchParams();
  const scheduleMatch = useMatch('/scheduler/*');

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const pid = e.currentTarget.getAttribute('data-pid');
    if (pid) {
      setSearchParams({ pid });
    }
  };

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <LinkBox onClick={handleClick} data-pid={pid} key={objectID}>
          <Card subject={subject} title={title} pid={pid} code={code} schedule={scheduleMatch != null} />
        </LinkBox>
      ))}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
