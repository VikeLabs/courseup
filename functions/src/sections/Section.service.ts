import { Section } from './Section.model';
// TODO: replace once main repo is updated.
import { UVicCourseScraper } from '@isaaccormack/uvic-course-scraper';
import { db } from '../db/firestore';
import { DetailedClassInformation } from '@isaaccormack/uvic-course-scraper/dist/src/types';

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

    return sections.map((e) => ({ crn: e.crn }));
  }

  public async getSectionSeats(
    term: string,
    subject: string,
    code: string
  ): Promise<DetailedClassInformation[]> {
    console.log(term, subject, code);
    // get term, subject, code to crn mappings from db.
    const doc = await db.sectionMappings
      .doc(SectionsService.constructSectionKey(term, subject, code))
      .get();

    const data = doc.data();

    if (!data) {
      throw new Error('Section Seats Not Found');
    }

    const seats = await Promise.all(
      data.crns.map(async (crn) => {
        const seat = await UVicCourseScraper.getSectionSeats(term, crn);
        return seat;
      })
    );

    return seats;
  }

  public async updateSectionMappings(): Promise<void> {
    const terms = ['202009'];
    // get all the courses
    const courses = (await UVicCourseScraper.getAllCourses()).map((course) => {
      // parse courseCatalogId into subject and code
      const subjectLength = course.subjectCode.name.length;
      const subject = course.__catalogCourseId.slice(0, subjectLength);
      const code = course.__catalogCourseId.slice(subjectLength);
      return { subject, code };
    });

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
              console.info(term, subject, code, sections.length);
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
