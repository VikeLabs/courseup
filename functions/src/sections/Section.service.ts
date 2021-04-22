import { Seat, Section } from './Section.model';
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';
import { Term } from '../constants';
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

  return sections;
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
        const {
          response: seat,
            timestamp
        } = await UVicCourseScraper.getSectionSeats(term, crn);
        return { ...seat, crn, date: timestamp };
      })
    );
  }
  return [];
}
