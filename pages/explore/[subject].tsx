import { Box, VStack } from "@chakra-ui/react";
import type { GetStaticProps } from "next";

import { Search } from "common/header/components/SearchBar";

import { getSubjects } from "@courseup/lib/subjects";
import { getCourseBySubjectCode } from "@courseup/lib/courses";

export const getStaticProps = async () => {
    const courses = getCourseBySubjectCode('202309', 'CSC');
};

export default function ExplorePageContainer({subjects}: {
    subjects: {
        subject: string,
        title: string
    }[]
}): JSX.Element {
    return <VStack p={6} gap={4}>
        <Search />
        <ExplorePage subjects={subjects} />
    </VStack>
}