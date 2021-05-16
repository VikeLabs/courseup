import { useEffect, useState } from 'react';

import { getSectionList } from '../api/getSectionList';
import { Section } from '../fetchers';

import { Course, useSavedCourses } from './useSavedCourses';

export type SectionListData = {
  subject: string;
  pid: string;
  term: string;
  code: string;
  sections: Section[];
};

const fetchData = async (courses: Course[]) => {
  const requests = courses.map(({ term, subject, code, pid }) => {
    return getSectionList({ term, subject, code }).then((sections: Section[]) => {
      return { term, subject, code, pid, sections };
    });
  });
  return Promise.all(requests);
};

export const useSectionList = () => {
  const { courses } = useSavedCourses();
  const [data, setData] = useState<SectionListData[]>([]);

  useEffect(() => {
    fetchData(courses).then((a) => {
      setData(a);
    });
  }, [courses]);

  return data;
};
