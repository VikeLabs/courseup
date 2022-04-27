import { Get, Controller, Route, Response, Path, Query } from 'tsoa';
import { BannerClient } from '../banner/bannerClient';
import { Term } from '../constants';
import { Seat, Section } from './Section.model';
import { getSections, getSectionSeats } from './Section.service';

const banner = new BannerClient()

@Route('sections')
export class SectionsController extends Controller {
  @Response(404, 'Section Not Found')
  @Get('{term}')
  public async sections(
    @Path() term: Term,
    @Query() subject: string,
    @Query() code: string,
    @Query() v9 = false
  ): Promise<Section[]> {
    const sections = await getSections(term, subject.toUpperCase(), code);
    // TODO: handle term
    const bannerData = await banner.getSearchResults({
      subject: subject.toUpperCase(),
      // this doesn't actually do much
      term: term,
      courseNumber: code,
    })

    const bannerSections: Section[] = bannerData.data.map(s => ({
      meetingTimes: s.meetingsFaculty.map(m => ({
        // TODO:
        type: m.meetingTime.meetingScheduleType,
        // TODO
        time: m.meetingTime.beginTime + ' - ' + m.meetingTime.endTime,
        // TODO: ex. "TWF"
        days: "",
        // TODO: ex. "Cornett Building B143"
        where: "",
        // TODO: ex. "May 04, 2022 - Jul 29, 2022"
        dateRange: "",
        // TODO: ex. "Lecture"
        scheduleType: "",
        // TODO: ex. ["John Smith (P)"]
        instructors: s.faculty.map(f => f.displayName + `${f.primaryIndicator ? ' (P)' : ''}`),
        // TODO: ex. "Cornett Building"
        building: "",
        // TODO: ex. "COR"
        buildingAccronym: "",
        // TODO: ex. "B143" 
        roomNumber: ''
      })),
      registrationDates: {
        start: "",
        end: ""
      },
      // TODO: ex. "face-to-face"
      instructionalMethod: "face-to-face",
      crn: s.courseReferenceNumber,
      associatedTerm: {
        // TODO: ex. "202205"
        start: "",
        // TODO: ex. "202208"
        end: ""
      },
      sectionCode: s.sequenceNumber,
      // TODO: ex. "lecture"
      sectionType: 'lecture',
      title: s.courseTitle,
      levels: [],
      // TODO
      additionalNotes: '',
      // TODO
      credits: s.creditHourLow.toString(),
      // TODO
      campus: 'in-person',
    }))

    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return v9 ? bannerSections : sections
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
