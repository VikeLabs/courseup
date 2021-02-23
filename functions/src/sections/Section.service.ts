import { Seat, Section } from './Section.model';
// TODO: replace once main repo is updated.
import { UVicCourseScraper } from '@isaaccormack/uvic-course-scraper';
import { db } from '../db/firestore';
import { subjectCodeExtractor } from '../shared/subjectCodeExtractor';
import { Term } from '../constants';
import { InvalidSubjectCodeError } from '../errors/errors';

export class SectionsService {
  public async getSections(
    term: string,
    subject: string,
    code: string
  ): Promise<Section[]> {
    const sections = await UVicCourseScraper.getCourseSections(
      term,
      subject,
      code
    );

    return sections;
  }

  public async getSectionSeats(
    term: Term,
    subject: string,
    code: string
  ): Promise<Seat[]> {
    // get term, subject, code to crn mappings from db.
    const doc = await db.sectionMappings
      .doc(SectionsService.constructSectionKey(term, subject, code))
      .get();

    const data = doc.data();

    if (!data) {
      throw new InvalidSubjectCodeError('Section Seats Not Found');
    }

    const seats = await Promise.all(
      data.crns.map(async (crn) => {
        const seat = await UVicCourseScraper.getSectionSeats(term, crn);
        return { ...seat, crn };
      })
    );

    return seats;
  }

  public async updateSectionMappings(): Promise<void> {
    // TODO: a good candidate for using RemoteConfig :)
    const terms = ['202009'];
    // get all the courses
    const courses = (await UVicCourseScraper.getAllCourses()).map((course) =>
      subjectCodeExtractor(course)
    );

    await Promise.all(
      courses.map(async ({ subject, code }) => {
        // for a given course, insert for each term
        await Promise.all(
          terms.map(async (term) => {
            const sections = await UVicCourseScraper.getCourseSections(
              term,
              subject,
              code
            );
            // don't want to put empty mappings in the database
            if (sections.length > 0) {
              await db.sectionMappings
                .doc(SectionsService.constructSectionKey(term, subject, code))
                .set({ crns: sections.map((s) => s.crn) });
            }
          })
        );
      })
    );
  }

  public static constructSectionKey(
    term: string,
    subject: string,
    code: string
  ): string {
    return `${term}${subject}${code}`;
  }
}
