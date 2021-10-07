import {
  Body,
  Controller,
  Get,
  Path,
<<<<<<< HEAD
  Post,
=======
  Put,
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
  Response,
  Route,
  SuccessResponse,
} from 'tsoa';
import { Timetable } from './Timetable.model';
import {
  addTimetable,
  getTimetable,
  TimetableParams,
  TimetableReturn,
} from './Timetable.service';

interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

@Route('timetables')
export class TimetablesController extends Controller {
  @Response(404, 'Not found')
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

  @Response<ValidateErrorJSON>(422, 'Invalid data')
  @SuccessResponse('201', 'Created')
<<<<<<< HEAD
  @Post()
=======
  @Put()
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
  public async createTimetable(
    @Body() requestBody: TimetableParams
  ): Promise<TimetableReturn | void> {
    const data = await addTimetable(requestBody.courses, requestBody.term);
    if (!data) {
      this.setStatus(422);
      return;
    }
    this.setStatus(201);
    return data;
  }
}
