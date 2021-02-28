import { Controller, Get, Path, Route } from 'tsoa';
import { Term } from '../constants';
import { Course, CourseDetails } from './Course.model';
import { CoursesService } from './Course.service';

@Route('courses')
export class CoursesController extends Controller {
  /**
   * Retrieves all the courses available. If query params are passed in, they will be used to filter results.
   * @param subject
   * @param code
   */
  @Get('{term}')
  public async getCourses(): Promise<Course[]> {
    // set the Cache-Control for 24h.
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${1800}`
    );
    return new CoursesService().getCourses();
  }

  /**
   * Retrieves course details given the term and pid.
   * @param pid
   * @param term
   */
  @Get('{term}/{pid}')
  public async getCourse(
    @Path() pid: string,
    @Path() term: Term
  ): Promise<CourseDetails> {
    // set the Cache-Control for 12h.
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${1800}`
    );
    return new CoursesService().getCourseDetailsByPid(term, pid);
  }
}
