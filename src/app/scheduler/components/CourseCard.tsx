import { AddIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton, BackgroundProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Term } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

export type CourseCardProps = {
  term: Term;
  subject: string;
  title: string;
  code: string;
  color: BackgroundProps['bg'];
  pid: string;
  selected: boolean;
  handleChange: Function;
  handleBookmarkClick: Function;
};

export function CourseCard({
  term,
  subject,
  title,
  code,
  color,
  pid,
  selected,
  handleChange,
  handleBookmarkClick,
}: CourseCardProps): JSX.Element {
  const { contains } = useSavedCourses();
  const courseIsSaved = contains(pid, term);

  const onBookmarkClick = useCallback(() => {
    handleBookmarkClick();
  }, [handleBookmarkClick]);

  const onChange = useCallback(() => {
    handleChange();
  }, [handleChange]);

  return (
    <Box boxShadow="md" cursor="pointer" as="label">
      <Flex direction="row" background={selected ? 'white' : 'blackAlpha.200'}>
        <Flex background={color} alignItems="center" justifyContent="center" mr="10px">
          <Flex>
            <Checkbox
              backgroundColor="whiteAlpha.600"
              colorScheme="whiteAlpha"
              iconColor="black"
              size="lg"
              mx="7px"
              isChecked={selected}
              onChange={onChange}
            />
          </Flex>
        </Flex>
        <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%">
          <VStack alignItems="start" spacing="0" py="2">
            <Text fontSize="lg" fontWeight="bold">
              {subject} {code}
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              {title}
            </Text>
          </VStack>
          <VStack alignContent="right" pr="5px" py="5px">
            <IconButton
              aria-label="Add to Scheduler"
              icon={courseIsSaved ? <CloseIcon color="white" /> : <AddIcon color="white" />}
              background={courseIsSaved ? 'red' : 'green.400'}
              size="sm"
              onClick={onBookmarkClick}
            />
            <IconButton
              aria-label="More information"
              icon={<InfoOutlineIcon color="white" />}
              size="sm"
              background="blue.400"
              as={Link}
              to={`/calendar/${term}/${subject}?pid=${pid}`}
            />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
