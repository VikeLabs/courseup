import { useEffect, useState } from 'react';

import { getSectionList } from '../api/getSectionList';
import { Section } from '../fetchers';
import { getFirstSectionType, hasSectionType } from '../utils/courses';

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
  const { setSection } = useSavedCourses();

  useEffect(() => {
    fetchData(courses).then((a) => {
      // a.forEach((course) => {
      //   if (hasSectionType(course.sections, 'lecture')) {
      //     const yo = getFirstSectionType(course.sections, 'lecture');
      //     console.log(course.subject, course.code, 'has lecture', yo, course.sections[yo]);
      //     setSection('lecture', course.sections[yo], course);
      //   }
      //   if (hasSectionType(course.sections, 'lab')) {
      //     const yo = getFirstSectionType(course.sections, 'lab');
      //     console.log(course.subject, course.code, 'has lab', yo, course.sections[yo]);
      //     setSection('lab', course.sections[yo], course);
      //   }
      //   if (hasSectionType(course.sections, 'tutorial')) {
      //     const yo = getFirstSectionType(course.sections, 'tutorial');
      //     console.log(course.subject, course.code, 'has tutorial', yo, course.sections[yo]);
      //     setSection('tutorial', course.sections[yo], course);
      //   }
      // });
      setData(a);
    });
  }, [courses]);

  return data;
};
