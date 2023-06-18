import { useState } from 'react';

import { Button, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { FiCamera } from 'react-icons/fi';
import { IoShareOutline } from 'react-icons/io5';

import { CreateTimetableResponse, Term, TimetableCourse, TimetableReturn, useCreateTimetable } from 'lib/fetchers';
import { useSavedCourses } from 'lib/hooks/useSavedCourses';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';

import ScreenshotModal from '../ScreenshotModal';

import ShareTimetableModal from './ShareTimetableModal';

export function ShareButton({ term, disabled }: { term: Term; disabled: boolean }): JSX.Element | null {
  const router = useRouter();
  // Matches `/s/:slug` and extracts the slug (import page)
  const match = router.asPath.match(/\/s\/(.*)/);
  const slug = match ? match[1] : '';

  const smallScreen = useSmallScreen();

  // opens the share timetable modal
  const {
    isOpen: isOpenShareTimetableModal,
    onOpen: onOpenShareTimetableModal,
    onClose: onCloseShareTimetableModal,
  } = useDisclosure();

  // opens the screenshot modal
  const {
    isOpen: isOpenScreenshotModal,
    onOpen: onOpenScreenshotModal,
    onClose: onCloseScreenshotModal,
  } = useDisclosure();

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

  const [screenshotUrl, setScreenshotUrl] = useState('' as string);
  const [filename, setFilename] = useState('' as string);

  const handleShare = () => {
    mutate({ term: term as Term, courses: timetableCourses }).then((data) => {
      setTimetable(data);
    });
    onOpenShareTimetableModal();
  };

  const handleScreenshot = () => {
    mutate({ term: term as Term, courses: timetableCourses }).then((data) => {
      setTimetable(data);

      // add screenshot styling to prevent squishing
      document
        .querySelectorAll('.rbc-event-content')
        .forEach((element) => element.classList.add('rbc-event-content-screenshot'));

      // target the calendar container exclusively
      const calendarHTMLElement: HTMLElement = document.getElementsByClassName('rbc-time-view')[0] as HTMLElement;
      // select the screenshot footer and clone for manipulation
      const footerHTMLElement: HTMLElement = document.getElementById('screenshotFooter') as HTMLElement;
      const footerShareURL: HTMLAnchorElement = document.getElementById(
        'screenshotFooterShareURL'
      ) as HTMLAnchorElement;

      const { slug } = data as TimetableReturn;
      footerShareURL.href = `${window.location.origin}/s/${slug}`;
      footerShareURL.textContent = `${window.location.origin}/s/${slug}`;

      const footerHTMLElementClone = footerHTMLElement.cloneNode(true) as HTMLElement;

      footerHTMLElementClone.style.visibility = 'visible';
      calendarHTMLElement.appendChild(footerHTMLElementClone);

      // on mobile the screenshot is of the day view
      // on desktop the screenshot is of the week view
      html2canvas(calendarHTMLElement, {
        windowHeight: smallScreen ? 1080 : 1080,
        windowWidth: smallScreen ? 360 : 1920,
      })
        .then((canvas: any) => {
          setFilename(`${term}_calendar.png`);
          setScreenshotUrl(canvas.toDataURL('image/png'));
          calendarHTMLElement.removeChild(footerHTMLElementClone);
          document
            .querySelectorAll('.rbc-event-content')
            .forEach((element) => element.classList.remove('rbc-event-content-screenshot'));
        })
        .then(() => {
          onOpenScreenshotModal();
        });
    });
  };

  return slug ? (
    <></>
  ) : (
    <>
      {smallScreen ? (
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
      <ScreenshotModal
        filename={filename}
        screenshotUrl={screenshotUrl}
        term={term}
        onClose={onCloseScreenshotModal}
        isOpen={isOpenScreenshotModal}
      />
      <ShareTimetableModal
        term={term}
        loading={loading}
        timetable={timetable}
        onClose={onCloseShareTimetableModal}
        isOpen={isOpenShareTimetableModal}
        inSessionSavedCourses={filteredCourses}
      />
    </>
  );
}
