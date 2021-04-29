import { IconButton } from '@chakra-ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Portal,
  Center,
  Text,
  Button,
  Spacer,
  HStack,
  Box,
  Image,
} from '@chakra-ui/react';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { VscFeedback, VscChevronDown } from 'react-icons/vsc';

import useLocalStorage from '../../../shared/hooks/storage/useLocalStorage';
import { useSavedCourses } from '../../../shared/hooks/storage/useSavedCourses';

type Props = {
  src: string;
  href: string;
};

function FeedbackButton({ href, src, children }: PropsWithChildren<Props>): JSX.Element | null {
  return (
    <Button
      as="a"
      href={href}
      target="_empty"
      h="fit-content"
      w="fit-content"
      p="10px"
      boxShadow="md"
      borderRadius="20%"
    >
      <Image src={src} />
    </Button>
  );
}

export function Bookmarks(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const [fresh, setFresh] = useState<string[]>([]);
  const open = () => setIsOpen(!isOpen);

  const [data, , deleteCourse] = useSavedCourses('123');
  useEffect(() => {
    if (data) {
      setFresh(JSON.parse(data));
    }
  }, [data]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const name = event.currentTarget.getAttribute('name');
      console.log(name);
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
            {fresh.map((el: string) => {
              return (
                <>
                  <Text>{el}</Text>
                  <Button onClick={onClick} name={el}>
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
