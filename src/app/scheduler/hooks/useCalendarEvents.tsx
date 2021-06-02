import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getSections } from '../../../shared/api/getSections';
import { MeetingTimes } from '../../../shared/fetchers';
import { useSavedCourses } from '../../../shared/hooks/useSavedCourses';
import { CalendarEvent } from '../components/CalendarEvent';

type Result =
  | undefined
  | { status: 'loaded'; data: CalendarEvent[] }
  | { status: 'loading' }
  | { status: 'error'; errorMessage: string };

export const useCalendarEvents = (): (({
  subject,
  code,
  sectionCode,
}: {
  subject: string;
  code: string;
  sectionCode: string;
}) => Promise<MeetingTimes[]>) => {
  const [result, setResult] = useState<Result>(undefined);
  const { courses } = useSavedCourses();
  const { term } = useParams();

  const func = useCallback(
    async ({ subject, code, sectionCode }: { subject: string; code: string; sectionCode: string }) => {
      const sections = await getSections({ term, subject, code });
      const section = sections.find((section) => section.sectionCode === sectionCode);
      if (section) return section.meetingTimes;
      else return [];
    },
    [term]
  );
  // useEffect(() => {
  //   // setResult({ status: 'loading' });

  //   const events: CalendarEvent[] = [];
  //   async function fetchData() {
  //     // You can await here
  //     courses
  //       .filter((course) => course.term === term)
  //       .forEach(async ({ subject, code, lab, lecture, tutorial, color }) => {
  //         const fella = await getSections({ subject, code, term });
  //         const aa = fella.filter(
  //           ({ sectionCode }) => sectionCode === lab || sectionCode === lecture || sectionCode === tutorial
  //         );
  //         aa.forEach((a) => {
  //           events.push({
  //             subject,
  //             code,
  //             meetingTime: a.meetingTimes[0],
  //             sectionCode: a.sectionCode,
  //             color,
  //             textColor: 'black',
  //           });
  //         });
  //       });
  //     // ...
  //   }
  //   fetchData();

  //   // return events;
  //   //   console.log(courses);
  //   setResult({ status: 'loaded', data: events });
  // }, [courses, term]);

  return func;
};
