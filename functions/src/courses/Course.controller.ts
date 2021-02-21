import { Controller, Get, Path, Query, Route } from 'tsoa';
import { Course } from './Course.model';
import { CoursesService } from './Course.service';

@Route('courses')
export class CoursesController extends Controller {
  /**
   * Retrieves all the courses available. If query params are passed in, they will be used to filter results.
   * @param subject
   * @param code
   */
  @Get()
  public async getAllCourses(
    @Query() subject?: string,
    @Query() code?: string
  ): Promise<Course[]> {
    console.log(subject, code);
    // set the Cache-Control for 24h.
    this.setHeader('Cache-Control', `public, max-age=${3600 * 24}`);
    return new CoursesService().getAllCourses();
  }

  @Get('{pid}')
  public async getCourse(@Path() pid: string): Promise<Course> {
    // set the Cache-Control for 12h.
    this.setHeader('Cache-Control', `public, max-age=${3600 * 12}`);
    return new CoursesService().getCourseDetailsByPid(pid);
  }
}
