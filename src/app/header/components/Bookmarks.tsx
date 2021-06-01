import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Button,
  Box,
  ButtonGroup,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Course, useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { Card } from '../../sidebar/components/Card';

export function Bookmarks(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const { courses } = useSavedCourses();

  return (
    <Popover isOpen={isOpen} autoFocus={false} placement="bottom" flip={false}>
      <PopoverTrigger>
        <ButtonGroup isAttached colorScheme="blackAlpha" size="sm">
          <Button width="125px" onClick={open}>
            {!isOpen ? 'My Bookmarks' : 'Close'}
          </Button>
        </ButtonGroup>
      </PopoverTrigger>

      <Portal>
        <PopoverContent bgColor="#E4E4E4" overflowY="auto" minW="300px" boxShadow="md" h="80vh" borderColor="blue.800">
          <PopoverBody>
            {courses.map((course: Course) => {
              return (
                <Box w="100%" padding="3px">
                  <Card subject={course.subject} code={course.code} pid={course.pid} title="" schedule />
                </Box>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
