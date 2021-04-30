import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Portal, Text, Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { Course, useSavedCourses } from '../../../shared/hooks/storage/useSavedCourses';

export function Bookmarks(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);

  const { courses, deleteCourse } = useSavedCourses();

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const name = event.currentTarget.getAttribute('name');
      deleteCourse(name!);
    },
    [deleteCourse]
  );

  return (
    <Popover isOpen={isOpen} autoFocus={false} placement="bottom" flip={false}>
      <PopoverTrigger>
        <Button onClick={open}>{!isOpen ? 'Bookmarks' : 'Close'}</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent overflowY="auto" minW="300px" boxShadow="md" h="90vh">
          <PopoverBody color="gray.600" py="10px">
            {courses.map((el: Course) => {
              return (
                <>
                  <Text>{`${el.subject} ${el.code}`}</Text>
                  <Button onClick={onClick} name={el.pid}>
                    remove
                  </Button>
                </>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
