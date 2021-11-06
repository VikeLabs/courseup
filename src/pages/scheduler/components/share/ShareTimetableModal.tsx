import { useEffect, useState } from 'react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react';
import { useParams } from 'react-router';

import { CreateTimetableResponse, Term, TimetableCourse, useCreateTimetable } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';
import { getReadableTerm } from 'lib/utils';

import { ShareModalContent } from './ShareModalContent';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  inSession_savedCourses: SavedCourse[];
};

export default function ShareTimetableModal({ onClose, isOpen, inSession_savedCourses }: Props) {
  const { term } = useParams();
  const [isSmallScreen] = useMediaQuery('(min-width:680px)');

  const { mutate, loading } = useCreateTimetable({});

  const [timetable, setTimetable] = useState({} as CreateTimetableResponse);

  const courses: TimetableCourse[] = inSession_savedCourses.map(
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

  useEffect(() => {
    isOpen && mutate({ term: term as Term, courses }).then((data) => setTimetable(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal size={isSmallScreen ? '2xl' : 'full'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalHeader>Share your {getReadableTerm(term || '')} timeline</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <ShareModalContent
              loading={loading}
              timetable={timetable}
              courses={inSession_savedCourses}
              isSmallScreen={isSmallScreen}
              term={term || ''}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
