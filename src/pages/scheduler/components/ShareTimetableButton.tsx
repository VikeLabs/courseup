import { Button, Icon } from '@chakra-ui/react';
import { IoShareOutline } from 'react-icons/io5';

export default function ShareTimetableButton() {
  return (
    <Button size="sm" bg="blue.400" color="white" leftIcon={<Icon as={IoShareOutline} />}>
      Share
    </Button>
  );
}
