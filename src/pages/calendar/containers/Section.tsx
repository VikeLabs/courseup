import { Box, Center, Divider, Heading, Spinner } from '@chakra-ui/react';

import { Section, Seat, Term, useSections } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';

import { NotFound } from 'common/notFound/NotFound';

import { SectionInfo } from '../components/Section';

function Sections({ sections, seats }: { sections: Section[]; seats?: Seat[] | null }): JSX.Element {
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
  const {
    data: sections,
    loading,
    error: sectionsError,
  } = useSections({ term, queryParams: { subject, code, v9: true } });
  const mode = useDarkMode();

  const seats = sections
    ?.filter((e) => e.seats !== undefined)
    .map(
      (e) =>
        ({
          title: e.sectionType,
          seats: {
            capacity: e.seats?.maxEnrollment,
            actual: e.seats?.enrollment,
            remaining: e.seats?.seatsAvailable,
          },
          waitListSeats: {
            capacity: e.seats?.waitCapacity,
            actual: e.seats?.waitCount,
            remaining: e.seats?.waitAvailable,
          },
          crn: e.crn,
        } as Seat)
    );

  if (loading) {
    return (
      <Center width="100%">
        <Spinner colorScheme="black" size="xl" color={mode('gray', 'dark.header')} />
      </Center>
    );
  }

  // we can't just look at sectionsError since it returns an empty array upon "not finding" any sections.
  if (sectionsError || sections?.length === 0) {
    return <NotFound term={term}>No sections offered for</NotFound>;
  }

  const sectionTypes: { sn: string; pl: string; type: string }[] = [
    { sn: 'Lecture', pl: 'Lectures', type: 'lecture' },
    { sn: 'Lecture Topic', pl: 'Lecture Topics', type: 'lecture topic' },
    { sn: 'Lab', pl: 'Labs', type: 'lab' },
    { sn: 'Gradable Lab', pl: 'Gradable Labs', type: 'gradable lab' },
    { sn: 'Tutorial', pl: 'Tutorials', type: 'tutorial' },
    { sn: 'Practicum', pl: 'Practicums', type: 'practicum' },
  ];

  const categorizedSections = sectionTypes.map(({ type, sn: singular, pl: plural }) => {
    return { singular, plural, sections: sections?.filter((s) => (s.sectionType as string) === type) };
  });

  return (
    <Box>
      {categorizedSections.map((c, i) => {
        if (c.sections && c.sections.length > 0) {
          return (
            <Box key={i}>
              <Heading size="xl" my={{ base: 0, md: 2 }} px={{ base: 2, md: 0 }}>
                {c.sections.length > 1 ? c.plural : c.singular}
              </Heading>
              <Sections sections={c.sections} seats={seats?.length === 0 ? undefined : seats} />
              <Divider />
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
}
