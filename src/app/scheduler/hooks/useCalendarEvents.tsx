import { useEffect, useMemo, useState } from 'react';

import { getSections } from '../../../shared/api/getSections';
import { ClassScheduleListing } from '../../../shared/fetchers';
import { SavedCourse } from '../../../shared/hooks/useSavedCourses';
import { CalendarEvent } from '../shared/types';

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
        // get sections for each course
        console.debug('fetching sections for saved courses');
        const coursesSections = await Promise.all(
          termCourses.map(async ({ term, subject, code, pid, lecture, lab, tutorial, selected, color }) => {
            // get sections for course
            const sections = await getSections({ term, subject, code });

            // TODO: transform into calendar events :wink:

            return { sections, term, subject, code, pid, lecture, lab, tutorial, selected, color };
          })
        );

        setResult({ status: 'loaded', data: coursesSections });
      } catch (e) {
        setResult({ status: 'error', errorMessage: e });
      }
    })();
  }, [termCourses]);

  return result;
}
