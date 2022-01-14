import { Button } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router';

export function BackTimetable(): JSX.Element {
  const { slug } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Button rightIcon={<BiArrowBack />} colorScheme="blue" onClick={() => navigate(`/s/${slug}`)}>
        Back
      </Button>
    </>
  );
}
