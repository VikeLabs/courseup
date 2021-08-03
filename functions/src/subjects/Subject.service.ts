import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist';
import { Term } from '../constants';
import { Subject } from './Subject.model';

export class SubjectsService {
  public static async getSubjects(term: Term): Promise<Subject[]> {
    const subjects = await UVicCourseScraper.getSubjects(term);
    return subjects.map(({ subject, title }) => ({
      subject,
      // removes the subject within the title
      title: title.replace(`(${subject})`, '').trim(),
    }));
  }
}
