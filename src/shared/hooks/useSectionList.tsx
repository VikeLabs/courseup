import { useEffect, useState } from 'react';

import { getSectionList } from '../api/getSectionList';
import { Section } from '../fetchers';

import { Course } from './useSavedCourses';

type SectionListData = {
  subject: string;
  code: string;
  section: Section;
};

export const useSectionList = (courses: Course[]) => {
  const [data, setData] = useState<SectionListData[]>([]);

  useEffect(() => {
    async function fetchData() {
      courses.forEach(async ({ term, subject, code }) => {
        const sections = (await getSectionList({ term, subject, code })) as Section[];
        let check: boolean = true;
        data.forEach((sectionListData) => {
          if (sections[0] === sectionListData.section) check = false;
        });
        check &&
          setData([
            ...data,
            {
              subject,
              code,
              section: sections[0],
            },
          ]);
      });
    }
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  return data;
};
