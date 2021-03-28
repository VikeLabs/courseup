import { Box } from '@chakra-ui/react';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
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
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const pid = e.currentTarget.getAttribute('data-pid');
    const subject = e.currentTarget.getAttribute('data-subject');
    const code = e.currentTarget.getAttribute('data-code');

    if (pid !== null && subject !== null && code != null) {
      setSelectedCourse({ pid, subject, code });
    }
  };

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <Box onClick={handleClick} data-pid={pid} data-subject={subject} data-code={code} key={objectID}>
          <Card subject={subject} title={title} code={code} selected={selectedCourse?.pid === pid} />
        </Box>
      ))}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
