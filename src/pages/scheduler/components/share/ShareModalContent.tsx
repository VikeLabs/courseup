import { Alert, AlertIcon, Heading, VStack } from '@chakra-ui/react';

import { CreateTimetableResponse, TimetableReturn } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils/terms';

import { SelectedCoursesCardList } from './SelectedCoursesCardList';
import { ShareLinkOptions } from './ShareLinkOptions';

type Props = {
  courses: SavedCourse[];
  isSmallScreen: boolean;
  term: string;
  loading: boolean;
  timetable: CreateTimetableResponse;
};

export function ShareModalContent({ courses, isSmallScreen, term, loading, timetable }: Props): JSX.Element {
  const { slug } = timetable as TimetableReturn;

  return (
    <VStack align="left" spacing="15px">
      <Alert status="info" borderRadius="10px">
        {isSmallScreen ? <AlertIcon /> : null}
        We&apos;ve generated a link that you can share to allow people to view and import the courses and sections you
        currently have selected for the {getReadableTerm(term)} term.
      </Alert>
      <Heading size="sm"> What you are sharing</Heading>
      <SelectedCoursesCardList courses={courses} term={term} />
      <ShareLinkOptions isSmallScreen={isSmallScreen} slug={slug} loading={loading} />
    </VStack>
  );
}
