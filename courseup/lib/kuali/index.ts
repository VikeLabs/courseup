import { KualiCourseCatalog, KualiCourseItem, KualiCourseItemParsed, UVicCourseScraper } from '../scraper';

export function subjectCodeExtractor(course: KualiCourseItem | KualiCourseCatalog): { subject: string; code: string } {
  return {
    subject: course.__catalogCourseId.slice(0, course.subjectCode.name.length),
    code: course.__catalogCourseId.slice(course.subjectCode.name.length),
  };
}

export type CourseCatalog = KualiCourseCatalog & {
  subject: string;
  code: string;
};

export async function fetchCourses(term: string): Promise<CourseCatalog[]> {
  const { response: courses } = await UVicCourseScraper.getCourses(term);
  return courses.map((course) => ({
    ...course,
    ...subjectCodeExtractor(course),
  }));
}

export async function fetchCourseDetailsByPid(term: string, pid: string): Promise<KualiCourseItemParsed> {
  const res = await UVicCourseScraper.getCourseDetailsByPid(term, pid);
  return {
    ...res.response,
    ...subjectCodeExtractor(res.response),
  };
}
