import { HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { MdCompareArrows } from 'react-icons/md';
import { useMatch, useNavigate, useParams } from 'react-router';

import { Timetable } from 'lib/fetchers';

import { ImportTimetable } from './ImportTimetable';
import { ReplaceTimetable } from './ReplaceTimetable';

export function TimetableActionButtons({ loading, data }: { loading: boolean; data: Timetable }): JSX.Element {
  const compareMatch = useMatch('/c/*');
  const { slug } = useParams();
  const navigate = useNavigate();

  const CompareTimetables = ({ loading, data }: { loading: boolean; data: Timetable }) => {
    return (
      <Button
        disabled={loading}
        rightIcon={<MdCompareArrows />}
        colorScheme="blue"
        onClick={() => navigate(`/c/${slug}`)}
      >
        Compare Timetables
      </Button>
    );
  };

  const BackTimetable = () => {
    return (
      <Button rightIcon={<BiArrowBack />} colorScheme="blue" onClick={() => navigate(`/s/${slug}`)}>
        Back
      </Button>
    );
  };

  return (
    <HStack spacing={10}>
      <ImportTimetable loading={loading} data={data} />
      <ReplaceTimetable loading={loading} data={data} />
      {compareMatch ? <BackTimetable /> : <CompareTimetables loading={loading} data={data} />}
    </HStack>
  );
}
