import { Seat, Section } from './Section.model';
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';
import { Term } from '../constants';
import { getCourse } from '../courses/Course.service';
import { locations } from '../constants'

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

  const newSections = sections as Section[];

  newSections.forEach((section) => {
    section.meetingTimes.forEach((meetingTime) => {
      const {where} = meetingTime;
      // i.e. where = 'Bob Wright Centre 123"
      // regex: /(.*)\s\d+/

      // set the type of the shortenedWhere to be optional
      type meetingTime = {
        shortenedWhere?: string
      }

      const building_regex = /(.*)( [a-zA-Z]?\d{1,3})/
      
      // check for a match
      const match = where.match(building_regex)
      let shortened = ""

      // if a match is found, assign the correct short form with room number to shortenedWhere
      if (match != null) {
        // replace the first group of the matched string (which has the building) with its shortened form
        // assign resulting value to shortened
        shortened = where.replace(building_regex, `${locations[match[1]]}$2`)
      }

      // assign shortened location value to shortenedWhere in the object
      meetingTime[shortenedWhere] = shortened
      
    })
  })

  return newSections;
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
