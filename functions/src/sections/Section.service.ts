import { Seat, Section } from './Section.model';
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';
import { Buildings, Term } from '../constants';
import { getCourse } from '../courses/Course.service';

export async function getSections(
  term: string,
  subject: string,
  code: string
): Promise<Section[]> {
  const { response: sections } = await UVicCourseScraper.getCourseSections(
    term,
    subject,
    code
  );

  return sections.map((section) => {
    const meetingTimes = section.meetingTimes.map((meetingTime) => {
      // i.e. where = 'Bob Wright Centre 123"
      const { where } = meetingTime;

      const buildingRegex = /(?<building>.+)\s(?<number>\S{3,6})/;

      const results = buildingRegex.exec(where);

      const building = results?.groups?.building;
      const roomNumber = results?.groups?.number;

      const buildingAccronym = Buildings.get(building ?? '');

      return {
        ...meetingTime,
        building,
        buildingAccronym,
        roomNumber,
      };
    });

    return {
      ...section,
      meetingTimes,
    };
  });
}

export async function getSectionSeats(
  term: Term,
  subject: string,
  code: string
): Promise<Seat[]> {
  // get term, subject, code to crn mappings from db.
  const mapping = await getCourse(term, subject, code);

  if (mapping) {
    return await Promise.all(
      mapping.crns.map(async (crn) => {
        const { response: seat, timestamp } =
          await UVicCourseScraper.getSectionSeats(term, crn);
        return { ...seat, crn, date: timestamp };
      })
    );
  }
  return [];
}
