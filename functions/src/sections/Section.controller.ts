import { Get, Controller, Route, Response, Path, Query } from 'tsoa';
import { BannerClient } from '../banner/bannerClient';
import { MeetingTime } from '../banner/banner';
import { Term, Buildings } from '../constants';
import { Seat, Section } from './Section.model';
import { getSections, getSectionSeats } from './Section.service';
import { formatTime, formatBuilding } from '../utils';

const banner = new BannerClient();

const days = (meetingTime: MeetingTime): string => {
  let days = '';
  if (meetingTime.monday) days = days.concat('M');
  if (meetingTime.tuesday) days = days.concat('T');
  if (meetingTime.wednesday) days = days.concat('W');
  if (meetingTime.thursday) days = days.concat('R');
  if (meetingTime.friday) days = days.concat('F');
  if (meetingTime.saturday) days = days.concat('S');

  return days;
};

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
    if (!v9) return await getSections(term, subject.toUpperCase(), code);

    const bannerData = await banner.getSearchResults({
      subject: subject.toUpperCase(),
      term: term,
      courseNumber: code,
    });

    const bannerSections: Section[] = await Promise.all(
      bannerData.data.map<Promise<Section>>(async (s) => ({
        meetingTimes: s.meetingsFaculty.map((m) => ({
          type: m.meetingTime.meetingTypeDescription,
          time:
            m.meetingTime.beginTime && m.meetingTime.endTime
              ? formatTime(m.meetingTime.beginTime) +
                ' - ' +
                formatTime(m.meetingTime.endTime)
              : 'TBA',
          days: days(m.meetingTime),
          where: m.meetingTime.buildingDescription
            ? `${formatBuilding(m.meetingTime.buildingDescription)} ${
                m.meetingTime.room
              }`
            : 'TBA',
          dateRange: `${m.meetingTime.startDate} - ${m.meetingTime.endDate}`,
          scheduleType: s.scheduleTypeDescription,
          instructors: s.faculty.map(
            (f) => f.displayName + `${f.primaryIndicator ? ' (P)' : ''}`
          ),
          building:
            formatBuilding(m.meetingTime.buildingDescription) ?? undefined,
          buildingAbbreviation: Buildings.get(
            m.meetingTime.buildingDescription ?? ''
          ),
          roomNumber: m.meetingTime.room ?? undefined,
        })),
        // TODO
        registrationDates: {
          start: '',
          end: '',
        },
        instructionalMethod: s.instructionalMethodDescription ?? '',
        crn: s.courseReferenceNumber,
        associatedTerm: {
          // TODO: ex. "202205"
          start: '',
          // TODO: ex. "202208"
          end: '',
        },
        sectionCode: s.sequenceNumber,
        sectionType: s.scheduleTypeDescription.toLowerCase() as
          | 'lecture'
          | 'lab'
          | 'tutorial',
        title: s.courseTitle,
        levels: [],
        additionalNotes:
          (await banner.getCourseDescription(
            s.term,
            s.courseReferenceNumber
          )) ?? '',
        // TODO
        credits: s.creditHourLow.toString(),
        // TODO
        campus: 'in-person',
        seats: {
          enrollment: s.enrollment,
          maxEnrollment: s.maximumEnrollment,
          seatsAvailable: s.seatsAvailable,
          waitAvailable: s.waitAvailable,
          waitCount: s.waitCount,
          waitCapacity: s.waitCapacity,
        },
      }))
    );
    await banner.clear(term);

    this.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=900');
    return bannerSections;
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
