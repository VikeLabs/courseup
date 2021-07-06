import { Controller, Get, Path, Query, Route } from 'tsoa';
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
  public async getCourses(
    @Path() term: Term,
    @Query() in_session = false
  ): Promise<Course[]> {
    // set the Cache-Control for 24h.
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
    );
    return CoursesService.getCourses(term, in_session);
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
      `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
    );
    return CoursesService.getCourseDetailsByPid(term, pid);
  }

  @Get('{term}/{subject}/{code}')
  public async getCourseDetails(
    @Path() term: Term,
    @Path() subject: string,
    @Path() code: string
  ): Promise<CourseDetails> {
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
    );
    return CoursesService.getCourseDetails(term, subject, code);
  }
}
