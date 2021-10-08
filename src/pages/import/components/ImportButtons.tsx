import { Button } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import { BsBoxArrowInDown, BsArrowRepeat } from 'react-icons/bs';

export function ImportButtons(): JSX.Element {
  return (
    <HStack spacing={10}>
      <Button rightIcon={<BsBoxArrowInDown />} colorScheme="purple">
        Import to Timetable
      </Button>
      <Button rightIcon={<BsArrowRepeat />} colorScheme="green">
        Replace Timetable
      </Button>
    </HStack>
  );
}
