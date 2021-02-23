import {
  KualiCourseCatalog,
  KualiCourseItem,
} from '@isaaccormack/uvic-course-scraper/dist/src/types';

export function subjectCodeExtractor(
  course: KualiCourseItem | KualiCourseCatalog
): { subject: string; code: string } {
  return {
    subject: course.__catalogCourseId.slice(0, course.subjectCode.name.length),
    code: course.__catalogCourseId.slice(course.subjectCode.name.length),
  };
}
