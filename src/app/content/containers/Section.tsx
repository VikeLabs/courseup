import { Box, Divider, Heading, Skeleton, Spinner } from '@chakra-ui/react';

import { ClassScheduleListing, Seat, Term, useSeats, useSections } from '../../../fetchers';
import { SectionInfo } from '../components/Section';

function Sections({ sections, seats }: { sections: ClassScheduleListing[]; seats?: Seat[] | null }): JSX.Element {
  return (
    <>
      {sections.map(({ sectionType, crn, sectionCode, instructionalMethod, additionalNotes, meetingTimes }) => (
        <SectionInfo
          section={sectionType}
          crn={crn}
          key={crn}
          sectionCode={sectionCode}
          instructionalMethod={instructionalMethod}
          additionalNotes={additionalNotes}
          meetingTimes={meetingTimes}
          seat={seats?.find((e) => e.crn === crn)}
        />
      ))}
    </>
  );
}

export interface SectionsContainerProps {
  term: Term;
  subject: string;
  code: string;
}

export function SectionsContainer({ term, subject, code }: SectionsContainerProps): JSX.Element {
  const { data: sections, loading: dataLoading } = useSections({ term, queryParams: { subject, code } });
  const { data: seats } = useSeats({ term, queryParams: { subject, code } });

  if (dataLoading) {
    <Spinner size="sm" />;
  }

  if (!sections) {
    <Skeleton />;
  }

  const lectures = sections?.filter((s) => s.sectionType === 'lecture');
  const labs = sections?.filter((s) => s.sectionType === 'lab');
  const tutorials = sections?.filter((s) => s.sectionType === 'tutorial');

  return (
    <Box>
      {lectures && lectures.length > 0 && (
        <>
          <Heading size="2xl" color="black" my="2">
            Lectures
          </Heading>
          <Sections sections={lectures} seats={seats} />
        </>
      )}
      {labs && labs.length > 0 && (
        <>
          <Divider />
          <Heading size="2xl" color="black" my="2">
            Labs
          </Heading>
          <Sections sections={labs} seats={seats} />
        </>
      )}
      {tutorials && tutorials.length > 0 && (
        <>
          <Divider />
          <Heading size="2xl" color="black" my="2">
            Tutorials
          </Heading>
          <Sections sections={tutorials} seats={seats} />
        </>
      )}
    </Box>
  );
}
