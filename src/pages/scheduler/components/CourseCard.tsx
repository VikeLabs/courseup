import { useCallback } from 'react';

import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton, BackgroundProps, Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Term, useGetCourse } from 'lib/fetchers';

export type CourseCardProps = {
  term: string;
  subject: string;
  code: string;
  color: BackgroundProps['bg'];
  pid: string;
  selected?: boolean;
  showSections?: boolean;
  handleSelection: ({
    code,
    pid,
    subject,
    term,
    selected,
  }: {
    code: string;
    pid: string;
    subject: string;
    term: string;
    selected?: boolean;
  }) => void;
  handleDelete: ({ code, pid, subject, term }: { code: string; pid: string; subject: string; term: string }) => void;
  handleShowSections: ({
    code,
    pid,
    subject,
    term,
    showSections,
  }: {
    code: string;
    pid: string;
    subject: string;
    term: string;
    showSections?: boolean;
  }) => void;
};

export function CourseCard({
  term,
  subject,
  code,
  color,
  pid,
  selected,
  showSections,
  handleSelection,
  handleShowSections,
  handleDelete,
}: CourseCardProps): JSX.Element {
  const onChange = useCallback(() => {
    handleSelection({ term, code, subject, pid, selected });
  }, [code, handleSelection, pid, selected, subject, term]);

  const onShowSections = useCallback(() => {
    handleShowSections({ term, code, subject, pid, showSections });
  }, [code, handleShowSections, pid, showSections, subject, term]);

  const onDelete = useCallback(() => {
    handleDelete({ term, code, subject, pid });
  }, [code, handleDelete, pid, subject, term]);

  const termTerm = term as Term;

  const { data, loading } = useGetCourse({ term: termTerm, pid });

  return (
    <Box boxShadow="md" w="100%">
      <Flex direction="row" bg="white">
        <Flex as="label" cursor="pointer" background={color} alignItems="center" justifyContent="center" mr="10px">
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
          <Flex grow={1}>
            <VStack alignItems="start" spacing="0" py="2">
              <Text fontSize="lg" fontWeight="bold" as={Link} to={`/calendar/${term}/${subject}?pid=${pid}`}>
                {subject} {code}
              </Text>
              <Text fontSize="sm" fontWeight="normal">
                <Skeleton isLoaded={!loading}>{data?.title ?? ''}</Skeleton>
              </Text>
            </VStack>
          </Flex>
          <VStack alignContent="right" pr="3" py="5px">
            <IconButton
              aria-label="Remove from Scheduler"
              icon={<CloseIcon color="white" />}
              bg="red.400"
              size="xs"
              onClick={onDelete}
            />
            <IconButton
              aria-label="More information"
              icon={showSections ? <ChevronDownIcon color="white" /> : <ChevronUpIcon color="white" />}
              bg="blue.400"
              size="xs"
              onClick={onShowSections}
            />
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
