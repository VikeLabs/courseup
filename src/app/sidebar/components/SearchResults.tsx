import { Box } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { HitsProvided } from 'react-instantsearch-core';
import { connectHits } from 'react-instantsearch-dom';

import { SelectedCourse } from '../../../pages/calendar';
import { Card } from '../components/Card';

type CourseRecord = {
  pid: string;
  subject: string;
  title: string;
  code: string;
};

type Props = HitsProvided<CourseRecord> & {
  selectedCourse?: SelectedCourse;
  onSelectedCourseChange: (selectedCourse?: SelectedCourse) => void;
};

const SearchResults = ({ hits, selectedCourse, onSelectedCourseChange }: Props) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const pid = e.currentTarget.getAttribute('data-pid');
    const subject = e.currentTarget.getAttribute('data-subject');
    const code = e.currentTarget.getAttribute('data-code');
    const title = e.currentTarget.getAttribute('data-title');

    if (pid && subject && code && title) {
      onSelectedCourseChange({ pid, subject, code, title });
    }
  };

  return (
    <>
      {hits.map(({ objectID, pid, subject, code, title }) => (
        <Box
          onClick={handleClick}
          data-pid={pid}
          data-subject={subject}
          data-code={code}
          data-title={title}
          key={objectID}
        >
          <Card subject={subject} title={title} code={code} selected={selectedCourse?.pid === pid} />
        </Box>
      ))}
    </>
  );
};

export const CustomHits = connectHits<Props, CourseRecord>(SearchResults);
