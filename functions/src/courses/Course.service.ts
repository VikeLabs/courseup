import { Course, CourseDetails } from './Course.model';
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';
import { subjectCodeExtractor } from '../shared/subjectCodeExtractor';

export class CoursesService {
  public async getCourses(): Promise<Course[]> {
    const courses = await UVicCourseScraper.getCourses();
    return courses.map((course) => ({
      ...subjectCodeExtractor(course),
      dateStart: course.dateStart,
      pid: course.pid,
      title: course.title,
    }));
  }

  public async getCourseDetailsByPid(
    term: string,
    pid: string
  ): Promise<CourseDetails> {
    const course = await UVicCourseScraper.getCourseDetailsByPid(term, pid);
    return {
      ...subjectCodeExtractor(course),
      dateStart: course.dateStart,
      pid: course.pid,
      title: course.title,
      description: course.description,
      credits: course.credits,
    };
  }
}
