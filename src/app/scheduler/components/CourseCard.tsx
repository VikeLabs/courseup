import { CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton, BackgroundProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Term } from '../../../shared/fetchers';

export type CourseCardProps = {
  term: Term;
  subject: string;
  title: string;
  code: string;
  color: BackgroundProps['bg'];
  pid: string;
  selected: boolean;
  onCourseChange: Function;
  onCourseDelete: Function;
};

export function CourseCard({
  term,
  subject,
  title,
  code,
  color,
  pid,
  selected,
  onCourseChange,
  onCourseDelete,
}: CourseCardProps): JSX.Element {
  const handleCourseChange = useCallback(() => {
    onCourseChange();
  }, [onCourseChange]);

  const handleCourseDelete = useCallback(() => {
    onCourseDelete();
  }, [onCourseDelete]);

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
              onChange={handleCourseChange}
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
              aria-label="Remove from Scheduler"
              icon={<CloseIcon color="white" />}
              background={'red'}
              size="sm"
              onClick={handleCourseDelete}
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
