import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
} from 'tsoa';
import { Timetable } from './Timetable.model';
import {
  addTimetable,
  getTimetable,
  TimetableParams,
} from './Timetable.service';

@Route('timetables')
export class TimetablesController extends Controller {
  @Get('{slug}')
  public async getTimetable(@Path() slug: string): Promise<Timetable> {
    // set the Cache-Control for 24h.
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
    );
    return getTimetable(slug);
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createUser(@Body() requestBody: TimetableParams): Promise<void> {
    this.setStatus(201);
    addTimetable(requestBody.courses);
    return;
  }
}
