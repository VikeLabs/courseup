import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa';
import { Timetable } from './Timetable.model';
import {
  addTimetable,
  getTimetable,
  TimetableParams,
} from './Timetable.service';

interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

@Route('timetables')
export class TimetablesController extends Controller {
  @Response<ValidateErrorJSON>(404, 'Not found')
  @Get('{slug}')
  public async getTimetable(@Path() slug: string): Promise<Timetable | void> {
    // set the Cache-Control for 24h.
    this.setHeader(
      'Cache-Control',
      `public, max-age=${3600}, s-max-age=${3600}, stale-while-revalidate=${30}, stale-if-error=${60}`
    );
    const data = await getTimetable(slug);
    if (!data) {
      this.setStatus(404);
      return;
    }
    return data;
  }

  @Response<ValidateErrorJSON>(422, 'Not found')
  @SuccessResponse('201', 'Created')
  @Post()
  public async createTimetable(
    @Body() requestBody: TimetableParams
  ): Promise<void> {
    //todo: big data validation
    this.setStatus(201);
    await addTimetable(requestBody.courses, requestBody.term);
    return;
  }
}
