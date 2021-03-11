import { Get, Controller, Route, Response, Path, Query } from 'tsoa';
import { Term } from '../constants';
import { Seat, Section } from './Section.model';
import { getSections, getSectionSeats } from './Section.service';

@Route('sections')
export class SectionsController extends Controller {
  @Response(404, 'Section Not Found')
  @Get('{term}')
  public async sections(
    @Path() term: Term,
    @Query() subject: string,
    @Query() code: string
  ): Promise<Section[]> {
    const sections = await getSections(term, subject.toUpperCase(), code);
    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return sections;
  }

  @Response(404, 'Section Seats Not Found')
  @Get('{term}/seats')
  public async seats(
    @Path() term: Term,
    @Query() subject: string,
    @Query() code: string
  ): Promise<Seat[]> {
    const seats = getSectionSeats(term, subject.toUpperCase(), code);
    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return seats;
  }

  // DO NOT INVOKE VIA THIS UNLESS RUNNING LOCALLY
  //   @Put('seats/update')
  //   public async updateMappings(): Promise<void> {
  //     new SectionsService().updateSectionMappings();
  //   }
}
