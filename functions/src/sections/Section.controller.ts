import { DetailedClassInformation } from '@vikelabs/uvic-course-scraper/dist/types';
import { Get, Controller, Route, Response, Path, Query } from 'tsoa';
import { Term } from '../constants';
import { Section } from './Section.model';
import { SectionsService } from './Section.service';

@Route('sections')
export class SectionsController extends Controller {
  @Response(404, 'Section Not Found')
  @Get('{term}')
  public async sections(
    @Path() term: Term,
    @Query() subject: string,
    @Query() code: string
  ): Promise<Section[]> {
    const sections = await new SectionsService().getSections(
      term,
      subject.toUpperCase(),
      code
    );
    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return sections;
  }

  @Response(404, 'Section Seats Not Found')
  @Get('{term}/seats')
  public async seats(
    @Path() term: Term,
    @Query() subject: string,
    @Query() code: string
  ): Promise<DetailedClassInformation[]> {
    const seats = new SectionsService().getSectionSeats(
      term,
      subject.toUpperCase(),
      code
    );
    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return seats;
  }

  // DO NOT INVOKE VIA THIS UNLESS RUNNING LOCALLY
  //   @Put('seats/update')
  //   public async updateMappings(): Promise<void> {
  //     new SectionsService().updateSectionMappings();
  //   }
}
