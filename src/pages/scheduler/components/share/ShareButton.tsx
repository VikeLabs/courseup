import { useState } from 'react';

import { Button, Icon, useDisclosure } from '@chakra-ui/react';
import { IoShareOutline } from 'react-icons/io5';
import { useMatch } from 'react-router';

import { CreateTimetableResponse, Term, TimetableCourse, useCreateTimetable } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import ShareTimetableModal from './ShareTimetableModal';

export function ShareButton({ term, disabled }: { term: Term; disabled: boolean }): JSX.Element {
  const importPage = useMatch('/s/:slug');

  const { isOpen, onOpen, onClose } = useDisclosure();

  // gets saved courses in session to enable/disable share button accordingly
  const { courses } = useSavedCourses();

  // filter courses in the current term, that contain at least one lecture/lab/tutorial, and that is currently selected
  const filteredCourses = courses
    .filter((course) => course.term === term)
    .filter((course) => course.lecture || course.lab || course.tutorial)
    .filter((course) => course.selected === true);

  const { mutate, loading } = useCreateTimetable({});

  const [timetable, setTimetable] = useState({} as CreateTimetableResponse);

  const timetableCourses: TimetableCourse[] = filteredCourses.map(
    ({ color, tutorial, lab, lecture, pid, code, subject }) => {
      return {
        color: color ?? '#A0AEC0',
        tutorial: tutorial ? [tutorial] : undefined,
        lab: lab ? [lab] : undefined,
        lecture: lecture ? [lecture] : undefined,
        pid: pid,
        code: code,
        subject: subject,
      };
    }
  );

  const handleShare = () => {
    mutate({ term: term as Term, courses: timetableCourses }).then((data) => {
      setTimetable(data);
    });
    onOpen();
  };

  return importPage ? (
    <></>
  ) : (
    <>
      <Button
        disabled={disabled}
        size="sm"
        colorScheme="purple"
        leftIcon={<Icon as={IoShareOutline} />}
        onClick={handleShare}
      >
        Share
      </Button>
      <ShareTimetableModal
        term={term}
        loading={loading}
        timetable={timetable}
        onClose={onClose}
        isOpen={isOpen}
        inSession_savedCourses={filteredCourses}
      />
    </>
  );
}
