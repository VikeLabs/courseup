import { useState } from 'react';

import { Box, Heading, VStack } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';

import { Term } from 'lib/fetchers';
import { getCurrentTerm, getReadableTerm } from 'lib/utils/terms';

import { Search } from 'common/header/components/SearchBar';
import { TermSelect } from 'common/header/components/TermSelect';

import { getSubjects } from '@courseup/lib/subjects';

import ExplorePage from '../components/explore/ExplorePage';
import { BannerClient } from '../functions/src/banner/bannerClient';

export const getStaticProps = async () => {
  const bc = new BannerClient();
  await bc.init();
  const terms = bc.availableTerms.slice(0, 3);

  const subjects = await Promise.all(
    terms.map(async (term) => {
      return { [term]: await getSubjects(term) };
    })
  );

  return {
    props: {
      terms,
      subjects: subjects.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    },
  };
};

export default function ExplorePageContainer({
  terms,
  subjects,
}: {
  terms: Term[];
  subjects: {
    [term: string]: {
      subject: string;
      title: string;
    }[];
  };
}): JSX.Element {
  const [term, setTerm] = useState(terms[0]);

  console.log(subjects, terms);

  return (
    <VStack p={6} gap={4}>
      <TermSelect terms={terms} selectedTerm={term} setTerm={setTerm} />
      <Search />
      <Heading size="lg">Explore {getReadableTerm(term)} Courses</Heading>
      <ExplorePage term={term} subjects={subjects[term]} />
    </VStack>
  );
}
