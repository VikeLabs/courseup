import { Course } from './Course.model';
// TODO: replace once main repo is updated.
import { UVicCourseScraper } from '@isaaccormack/uvic-course-scraper';

export class CoursesService {
  public async getAllCourses(): Promise<Course[]> {
    const courses = await UVicCourseScraper.getAllCourses();
    return courses.map((e) => ({
      id: e.pid,
      title: e.title,
    }));
  }

  public async getCourseDetailsByPid(pid: string): Promise<Course> {
    const course = await UVicCourseScraper.getCourseDetailsByPid(pid);
    return { id: course.pid, title: course.title };
  }
}
