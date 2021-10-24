import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import { BsBoxArrowInDown, BsArrowRepeat } from 'react-icons/bs';

export function ImportButtons({ loading }: { loading: boolean }): JSX.Element {
  return (
    <HStack spacing={10}>
      <Button disabled={loading} rightIcon={<BsBoxArrowInDown />} colorScheme="purple">
        Import to Timetable
      </Button>
      <Button disabled={loading} rightIcon={<BsArrowRepeat />} colorScheme="green">
        Replace Timetable
      </Button>
    </HStack>
  );
}
