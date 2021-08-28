import { useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router';

import { useSavedCourses } from 'lib/hooks/useSavedCourses';

import { getCourseTextbooks, TextbookInfo } from '../api/getCourseTextbooks';

type TextbookResult = { status: 'loaded'; textbookInfo: TextbookInfo[] } | { status: 'loading' };

export const useTextbooks = (): TextbookResult => {
  const [result, setResult] = useState<TextbookResult>({ status: 'loading' });
  const { courses } = useSavedCourses();
  const { term } = useParams();

  const termCourses = useMemo(() => courses.filter((c) => c.term === term), [term, courses]);

  useEffect(() => {
    (async () => {
      const textbookInfo = await Promise.all(
        termCourses
          .map(async ({ subject, code, lab, lecture, tutorial }) => {
            const courseTextbooks: TextbookInfo | null = await getCourseTextbooks(subject, code);
            // console.log(courseTextbooks);

            // remove any sections that aren't saved
            if (courseTextbooks) {
              console.log(courseTextbooks);
              courseTextbooks.sections = courseTextbooks.sections.filter(
                ({ section }) => section === lab || section === tutorial || section === lecture
              );

              return courseTextbooks;
            }
          })
          .filter((textbook) => textbook) as Promise<TextbookInfo>[]
      );

      setResult({ status: 'loaded', textbookInfo });
    })();
  }, [termCourses]);

  return result;
};
