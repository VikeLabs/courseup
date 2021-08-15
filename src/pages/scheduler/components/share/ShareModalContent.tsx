import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react';

import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

import { SelectedCoursesCardList } from './SelectedCoursesCardList';
import { ShareLinkOptions } from './ShareLinkOptions';

type Props = {
  courses: SavedCourse[];
  isSmallScreen: boolean;
  term: string;
};

export function ShareModalContent({ courses, isSmallScreen, term }: Props): JSX.Element {
  const slug = 'https://courseup.ca/s/9w845yetg9d8gh938wrhsde9';

  return (
    <VStack align="left" spacing="15px">
      <Alert status="info" borderRadius="10px">
        {isSmallScreen ? <AlertIcon /> : null}
        We've generated a link that you can share to allow people to view, compare, and import the courses and sections
        you currently have selected for the {getReadableTerm(term)} term.
      </Alert>
      <Heading size="sm"> What you are sharing </Heading>
      <SelectedCoursesCardList courses={courses} term={term} />
      <ShareLinkOptions isSmallScreen={isSmallScreen} slug={slug} />
    </VStack>
  );
}
