import { Box, Center, Divider, Heading, Spinner, Text } from '@chakra-ui/react';

import { ClassScheduleListing, Seat, Term, useSeats, useSections } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';
import { getReadableTerm } from 'lib/utils';

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
  const { data: sections, loading, error: sectionsError } = useSections({ term, queryParams: { subject, code } });
  const { data: seats, error: seatsError } = useSeats({ term, queryParams: { subject, code } });
  const mode = useDarkMode();

  if (loading) {
    return (
      <Center width="100%">
        <Spinner colorScheme="black" size="xl" color={mode('gray', 'dark.header')} />
      </Center>
    );
  }

  // we can't just look at sectionsError since it returns an empty array upon "not finding" any sections.
  if (seatsError || sectionsError || sections?.length === 0 || seats?.length === 0) {
    return (
      <Center>
        <Heading size="md" color={mode('gray', 'dark.header')}>
          Unable to find sections for{' '}
          <Text as="span" color={mode('black', 'white')}>
            {getReadableTerm(term)}
          </Text>
        </Heading>
      </Center>
    );
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
              <Heading size="xl" my="2">
                {c.sections.length > 1 ? c.plural : c.singular}
              </Heading>
              <Sections sections={c.sections} seats={seats} />
              <Divider />
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
}
