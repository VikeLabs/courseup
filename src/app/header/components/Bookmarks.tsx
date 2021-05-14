import { CloseIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Text,
  Button,
  Spacer,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { Course, useSavedCourses } from '../../../shared/hooks/useSavedCourses';

export function Bookmarks(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const { courses, deleteCourse } = useSavedCourses();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const pid = event.currentTarget.getAttribute('pid');
      const term = event.currentTarget.getAttribute('term');
      const code = event.currentTarget.getAttribute('code');
      const subject = event.currentTarget.getAttribute('subject');

      if (subject && term && code && pid) {
        deleteCourse({ subject, code, pid, term });
      }
    },
    [deleteCourse]
  );
  return (
    <Popover isOpen={isOpen} autoFocus={false} placement="bottom" flip={false}>
      <PopoverTrigger>
        <Button onClick={open}>{!isOpen ? 'My Bookmarks' : 'Close'}</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent overflowY="auto" minW="300px" boxShadow="md" h="90vh" borderColor="blue.800">
          <PopoverBody color="gray.600" py="10px">
            {courses.map((course: Course) => {
              return (
                <>
                  <Box display="flex" bg="red">
                    <Text fontSize="lg">
                      {`${course.subject} ${course.code}`}
                      {/* <Spacer /> */}
                      {/* <Button
                        colorScheme="red"
                        onClick={onClick}
                        pid={course.pid}
                        subject={course.subject}
                        term={course.term}
                        code={course.code}
                      >
                        Remove
                      </Button> */}
                    </Text>
                    <IconButton
                      onClick={onClick}
                      pid={course.pid}
                      subject={course.subject}
                      term={course.term}
                      code={course.code}
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<CloseIcon />}
                    />
                  </Box>
                </>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
