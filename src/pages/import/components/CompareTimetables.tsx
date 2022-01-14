import { Button } from '@chakra-ui/react';
import { MdCompareArrows } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';

import { Timetable } from 'lib/fetchers';

export function CompareTimetables({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const { slug } = useParams();

  const navigate = useNavigate();

  return (
    <>
      <Button
        disabled={loading}
        rightIcon={<MdCompareArrows />}
        colorScheme="blue"
        onClick={() => navigate(`/c/${slug}`)}
      >
        Compare Timetables
      </Button>
    </>
  );
}
