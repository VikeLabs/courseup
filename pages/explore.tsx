import { Box, VStack } from "@chakra-ui/react";
import type { GetStaticProps } from "next";

import { Search } from "common/header/components/SearchBar";

import { getSubjects } from "@courseup/lib/subjects";


import ExplorePage from "../components/explore/ExplorePage";


export const getStaticProps = async () => {
    const subjects = await getSubjects('202309');
    return {
        props: {
            subjects
        }
    }
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