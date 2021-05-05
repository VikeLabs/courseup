/* eslint-disable prettier/prettier */
import { AddIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, Checkbox, IconButton } from '@chakra-ui/react';
import { useCallback } from 'react';

import { useGetCourse, Term } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';

export type CourseCardProps = {
    term: Term;
    subject: string;
    title: string;
    code: string;
    colour: string;
    pid: string;
    selected: boolean;
    handleChange: Function;
    handleInfo: Function;
}

export function CourseCard({ term, subject, title, code, colour, pid, handleChange, handleInfo, selected }: CourseCardProps): JSX.Element {
    const { data } = useGetCourse({ term, pid: pid || '' })
    const { addCourse, deleteCourse, contains } = useSavedCourses()
    const courseIsSaved = contains(data?.pid!, term);

    const onCourseClick = useCallback(() => {
        if (data) {
            if (!courseIsSaved) {
                addCourse({ subject: data.subject, code: data.code, pid: data.pid, term });
            } else {
                deleteCourse({ subject: data.subject, code: data.code, pid: data.pid, term })
            }
        }
    }, [data, courseIsSaved, addCourse, term, deleteCourse])

    const onInfo = () => {
        handleInfo()
    }

    const onChange = () => {
        handleChange();
    }

    return (
        <Box
            boxShadow="md"
            cursor="pointer"
        >
            <Flex direction="row" background={!selected ? 'blackAlpha.200' : 'white'}>
                <Flex background={colour} alignItems="center" justifyContent="center" mr="10px">
                    <Flex>
                        <Checkbox backgroundColor="whiteAlpha.600" colorScheme="whiteAlpha" iconColor="black" size="lg" mx="7px" isChecked={selected} onChange={onChange} />
                    </Flex>
                </Flex>
                <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%" >
                    <VStack alignItems="start" spacing="0" py="2">
                        <Text fontSize="lg" fontWeight="bold">
                            {subject} {code}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal">
                            {title}
                        </Text>
                    </VStack>
                    <VStack alignContent="right" pr="5px" py="5px">
                        <IconButton aria-label="Add to Scheduler" icon={!courseIsSaved ? <AddIcon color="white" /> : <CloseIcon color="white" />} background={!courseIsSaved ? "green.400" : "red"} size="sm" onClick={onCourseClick} />
                        <IconButton aria-label="More information" icon={<InfoOutlineIcon color="white" />} size="sm" background="blue.400" onClick={onInfo} />
                    </VStack>
                </Flex>
            </Flex>
        </Box >
    );
}