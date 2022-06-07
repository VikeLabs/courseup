import { useState } from 'react';

import { Button, Icon, IconButton, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import { FiCamera } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';
import { useMatch } from 'react-router';

import { CreateTimetableResponse, Term, TimetableCourse, useCreateTimetable } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import ShareTimetableModal from './ShareTimetableModal';

export function ShareButton({ term, disabled }: { term: Term; disabled: boolean }): JSX.Element | null {
  const importPage = useMatch('/s/:slug');
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
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

  const handleScreenshot = () => {
    // target the calendar container exclusively
    const calendarHTMLElement: HTMLElement = document.getElementsByClassName('rbc-time-view')[0] as HTMLElement;
    // select the screenshot footer and clone for manipulation
    const footerHTMLElement: HTMLElement = document.getElementById('screenshotFooter') as HTMLElement;
    const footerHTMLElementClone = footerHTMLElement.cloneNode(true) as HTMLElement;

    footerHTMLElementClone.style.visibility = 'visible';
    calendarHTMLElement.appendChild(footerHTMLElementClone);

    // on mobile the screenshot is of the day view
    // on desktop the screenshot is of the week view
    html2canvas(calendarHTMLElement, {
      windowHeight: isMobile ? 1080 : 1080,
      windowWidth: isMobile ? 360 : 1920,
    })
      .then((canvas) => {
        downloadCalendarScreenshot(canvas.toDataURL(), `${term}_calendar.png`);
        calendarHTMLElement.removeChild(footerHTMLElementClone);
      })
      .then(() => {
        // open share modal to encourage sharing
        handleShare();
      });
  };

  const downloadCalendarScreenshot = (uri: string, filename: string) => {
    const downloadLink = document.createElement('a');

    if (typeof downloadLink.download === 'string') {
      downloadLink.href = uri;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      window.open(uri);
    }
  };

  return importPage ? (
    <></>
  ) : (
    <>
      {isMobile ? (
        <>
          <IconButton
            aria-label="Share timetable"
            icon={<IoShareOutline />}
            disabled={disabled}
            size="sm"
            colorScheme="purple"
            onClick={handleShare}
          />
          <IconButton
            icon={<FiCamera />}
            aria-label="Download screenshot of timetable"
            size="sm"
            colorScheme="orange"
            onClick={handleScreenshot}
            disabled={disabled}
          />
        </>
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
          <Button size="sm" colorScheme="orange" onClick={handleScreenshot} disabled={disabled}>
            Screenshot
          </Button>
        </>
      )}
      <ShareTimetableModal
        term={term}
        loading={loading}
        timetable={timetable}
        onClose={onClose}
        isOpen={isOpen}
        inSessionSavedCourses={filteredCourses}
      />
    </>
  );
}
