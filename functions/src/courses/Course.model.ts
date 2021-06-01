import {
  KualiCourseCatalog,
  KualiCourseItemParsed,
} from '@vikelabs/uvic-course-scraper/dist/types';

/**
 * @tsoaModel
 */
export interface Course extends Pick<KualiCourseCatalog, 'pid' | 'title'> {
  subject: string;
  code: string;
}

export interface CourseDetails
  extends Pick<
    KualiCourseItemParsed,
    'pid' | 'title' | 'description' | 'dateStart' | 'credits' | 'hoursCatalog'
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
