import { useCallback, useEffect, useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton, BackgroundProps, Skeleton, Collapse } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { MeetingTimes, Term, useGetCourse } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { SavedCourseWithSections } from '../shared/types';

import { SectionsCardContainer } from './SchedulerSections';

export type CourseCardProps = {
  term: string;
  subject: string;
  code: string;
  color: BackgroundProps['bg'];
  course: SavedCourseWithSections;
  courses: SavedCourse[];
  pid: string;
  selected?: boolean;
  key: number;
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
  handleCourseSectionChange: (
    sectionType: string,
    sectionCode: string,
    meetingTimes: MeetingTimes[],
    code: string,
    subject: string,
    pid: string,
    term: string
  ) => void;
};

export function CourseCard({
  term,
  subject,
  code,
  color,
  course,
  courses,
  pid,
  selected,
  key,
  handleSelection,
  handleDelete,
  handleCourseSectionChange,
}: CourseCardProps): JSX.Element {
  const mode = useDarkMode();

  const onChange = useCallback(() => {
    handleSelection({ term, code, subject, pid, selected });
  }, [code, handleSelection, pid, selected, subject, term]);

  const onDelete = useCallback(() => {
    handleDelete({ term, code, subject, pid });
  }, [code, handleDelete, pid, subject, term]);

  const [showSections, setShowSections] = useState<boolean>(false);

  const onShowSections = () => {
    setShowSections(!showSections);
  };

  useEffect(() => {
    setShowSections(!!selected);
  }, [selected]);

  const termTerm = term as Term;

  const { data, loading } = useGetCourse({ term: termTerm, pid });

  return (
    <VStack key={key} mt="1" spacing="0" w="100%">
      <Box boxShadow="md" w="100%" bgColor={mode('white', 'dark.main')}>
        <Flex direction="row">
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
            <Flex grow={1}>
              <VStack
                alignItems="start"
                spacing="0"
                py="2"
                _hover={{
                  textDecoration: 'underline',
                }}
                as={Link}
                to={`/calendar/${term}/${subject}?pid=${pid}`}
              >
                <Text fontSize="lg" fontWeight="bold" tabIndex={0}>
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
                icon={<CloseIcon />}
                colorScheme="red"
                size="xs"
                onClick={onDelete}
              />
              <IconButton
                aria-label="More information"
                icon={
                  showSections ? (
                    <ChevronUpIcon color="white" boxSize="1.5em" />
                  ) : (
                    <ChevronDownIcon color="white" boxSize="1.5em" />
                  )
                }
                colorScheme="blue"
                size="xs"
                onClick={onShowSections}
              />
            </VStack>
          </Flex>
        </Flex>
      </Box>
      <Collapse in={showSections} animateOpacity style={{ width: '100%' }}>
        <SectionsCardContainer
          course={course}
          courses={courses}
          sections={course.sections}
          handleChange={handleCourseSectionChange}
        />
      </Collapse>
    </VStack>
  );
}
