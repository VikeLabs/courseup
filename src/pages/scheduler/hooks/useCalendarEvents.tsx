import { useEffect, useMemo, useState } from 'react';

import { getSections } from 'lib/api/getSections';
import { ClassScheduleListing } from 'lib/fetchers';
import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { CalendarEvent } from '../shared/types';

// where key is the term, subject and code
const SECTIONS_CACHE: { [key: string]: ClassScheduleListing[] } = {};

type SavedCourseWithSections = SavedCourse & { sections: ClassScheduleListing[]; events?: CalendarEvent[] };

type CalendarEventsResult =
  | { status: 'loading' }
  | {
      status: 'loaded';
      data: SavedCourseWithSections[];
    }
  | { status: 'error'; errorMessage: string };

// takes in list of locally saved courses, returns the same list but with a sections property
export function useCalendarEvents(term: string, courses: SavedCourse[]) {
  // this hook is async so let the initial state to 'loading'
  const [result, setResult] = useState<CalendarEventsResult>({ status: 'loading' });

  // avoid unnessary filtering operations by memoization
  const termCourses = useMemo(() => courses.filter((c) => c.term === term), [term, courses]);

  useEffect(() => {
    (async () => {
      try {
        const coursesSections = await Promise.all(
          termCourses.map(
            async ({ term, subject, code, pid, lecture, lab, tutorial, selected, showSections, color }) => {
              const key = `${term}_${subject}_${code}`;
              const cachedSections = SECTIONS_CACHE[key];

              if (!cachedSections) {
                const sections = await getSections({ term, subject, code });
                SECTIONS_CACHE[key] = sections;
              }
              // TODO: transform into calendar events :wink:

              return {
                sections: SECTIONS_CACHE[key],
                term,
                subject,
                code,
                pid,
                lecture,
                lab,
                tutorial,
                selected,
                showSections,
                color,
              };
            }
          )
        );

        setResult({ status: 'loaded', data: coursesSections });
      } catch (e) {
        setResult({ status: 'error', errorMessage: e });
      }
    })();
  }, [termCourses]);

  return result;
}
