import { Controller, Get, Query, Response, Route } from 'tsoa';
import { getInstructorRating } from './Instructor.service';

@Route('instructors')
export class InstructorController extends Controller {
  @Response(404, 'Instructor Not Found')
  @Get('rating')
  public async instructorRating(@Query() name: string): Promise<number> {
    const rating = await getInstructorRating(name);

    if (!rating) {
      this.setStatus(404);
      return 0;
    }

    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');

    return rating;
  }
}
