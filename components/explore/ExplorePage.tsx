import { Box, Flex, Heading } from "@chakra-ui/react";

import {SubjectsList} from "common/layouts/sidebar/components/SubjectsList";

import { getSubjects } from "@courseup/lib/subjects";

export default function ExplorePage({subjects}: {
    subjects: {
        subject: string,
        title: string
    }[]
}): JSX.Element {
    
    return <Flex wrap='wrap' gap={6}>
        {subjects.map((subject) => (
            <Box as="a" href="https://google.com/" key={subject.subject} minW={200} w="20%" minH={100} flexGrow={1} p={6} borderRadius='lg' shadow='lg' transition='0.5s' _hover={{shadow: '2xl'}}>
                <Heading size='md'>{subject.title}</Heading>
            </Box>
        ))}
    </Flex>
}