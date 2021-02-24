import {
  KualiCourseCatalog,
  KualiCourseItem,
} from '@vikelabs/uvic-course-scraper/dist/types';

export interface Course
  extends Pick<KualiCourseCatalog, 'pid' | 'title' | 'dateStart'> {
  subject: string;
  code: string;
}

export interface CourseDetails
  extends Pick<
    KualiCourseItem,
    'pid' | 'title' | 'description' | 'dateStart' | 'credits'
  > {
  /**
   * Abbriviation of the subject of the course.
   * @example "ECE"
   */
  subject: string;
  /**
   * The code portion of the course.
   * @example "260"
   */
  code: string;
  /**
   * If a course was named something else previously.
   * @example "ELEC260"
   */
  formally?: string;
}
