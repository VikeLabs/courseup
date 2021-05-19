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
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { Course, useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { SidebarTemplate } from '../../../shared/SidebarTemplate';
import { Card } from '../../sidebar/components/Card';

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
        <ButtonGroup isAttached colorScheme="blackAlpha" size="sm">
          <Button width="125px" onClick={open}>
            {!isOpen ? 'My Bookmarks' : 'Close'}
          </Button>
        </ButtonGroup>
      </PopoverTrigger>

      <Portal>
        <PopoverContent overflowY="auto" minW="300px" boxShadow="md" h="80vh" borderColor="blue.800">
          <PopoverBody>
            {courses.map((course: Course) => {
              return (
                <Box w="100%" padding="3px">
                  <Card
                    subject={course.subject}
                    title="need title"
                    code={course.code}
                    selected={false}
                    schedule={true}
                  />
                </Box>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
