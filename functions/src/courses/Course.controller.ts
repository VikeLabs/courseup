import { Controller, Get, Path, Route } from 'tsoa';
import { Course, CourseDetails } from './Course.model';
import { CoursesService } from './Course.service';

@Route('courses')
export class CoursesController extends Controller {
  /**
   * Retrieves all the courses available. If query params are passed in, they will be used to filter results.
   * @param subject
   * @param code
   */
  @Get()
  public async getAllCourses(): Promise<Course[]> {
    // set the Cache-Control for 24h.
    this.setHeader('Cache-Control', `public, max-age=${3600}, s-max-age=${1800}`);
    return new CoursesService().getAllCourses();
  }

  @Get('{pid}')
  public async getCourse(@Path() pid: string): Promise<CourseDetails> {
    // set the Cache-Control for 12h.
    this.setHeader('Cache-Control', `public, max-age=${3600}, s-max-age=${1800}`);
    return new CoursesService().getCourseDetailsByPid(pid);
  }
}
