import { CourseMapping, Seat, Section } from './Section.model';
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';
import { db } from '../db/firestore';
import { subjectCodeExtractor } from '../shared/subjectCodeExtractor';
import { Term } from '../constants';
import { SectionNotFoundError } from '../errors/errors';

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
    const mapping =
      (await this.getSectionMapping(term, subject, code)) ||
      (await this.setSectionMapping(term, subject, code));

    if (mapping) {
      return await Promise.all(
        mapping.crns.map(async (crn) => {
          const seat = await UVicCourseScraper.getSectionSeats(term, crn);
          return { ...seat, crn, date: new Date(Date.now()) };
        })
      );
    }
    throw new SectionNotFoundError('Seats Not Found');
  }

  public async getSectionMapping(
    term: string,
    subject: string,
    code: string
  ): Promise<CourseMapping | undefined> {
    const doc = await db.courseMappings
      .doc(SectionsService.constructSectionKey(term, subject, code))
      .get();

    const t = doc.data()?.retrieveAt?.getTime();
    // if retrievedAt exists and it wasn't retieved within 30 minutes
    if (t && t + 1000 * 1800 > Date.now()) {
      return undefined;
    }
    return doc.data();
  }

  public async setSectionMapping(
    term: string,
    subject: string,
    code: string
  ): Promise<CourseMapping | void> {
    try {
      const sections = await UVicCourseScraper.getCourseSections(
        term,
        subject,
        code
      );
      if (sections.length > 0) {
        const crns = sections.map(({ crn }) => crn);
        await db.courseMappings
          .doc(SectionsService.constructSectionKey(term, subject, code))
          .set({ crns });
        return { crns, retrieveAt: new Date(Date.now()) };
      }
    } catch (e) {}
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
              await db.courseMappings
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
