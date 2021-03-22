import { Box } from '@chakra-ui/react';
import { Dispatch, MouseEvent, SetStateAction, useCallback } from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import { SelectedCourse } from '../../../App';
import { Card } from '../components/Card';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = HitsProvided<CourseRecord> & {
  selectedCourse?: SelectedCourse;
  setSelectedCourse: Dispatch<SetStateAction<SelectedCourse | undefined>>;
};

const SearchResults = ({ hits, selectedCourse, setSelectedCourse }: Props) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      const subject = e.currentTarget.getAttribute('data-subject');
      const code = e.currentTarget.getAttribute('data-code');

      if (pid && subject && code) {
        setSelectedCourse({ pid, subject, code });
      }
    },
    [setSelectedCourse]
  );

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <Box onClick={handleClick} data-pid={pid} data-subject={subject} data-code={code} key={objectID}>
          <Card subject={subject} title={title} code={code} />
        </Box>
      ))}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
