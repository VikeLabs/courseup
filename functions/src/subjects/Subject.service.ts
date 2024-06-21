import {
  KualiSubject,
  UVicCourseScraper,
} from '@vikelabs/uvic-course-scraper/dist';
import { Term } from '../constants';
import { Subject } from './Subject.model';

export class SubjectsService {
  public static async getSubjects(term: Term): Promise<Subject[]> {
    const subjects: KualiSubject[] = (
      await UVicCourseScraper.getCourses(term)
    ).response.map((course) => {
      return {
        subject: course.subjectCode.name,
        title: course.subjectCode.description,
      };
    });

    // remove duplicates based on two keys

    const m = new Map<string, KualiSubject>();
    subjects.forEach((subject) => {
      m.set(`${subject.subject}-${subject.title}`, subject);
    });

    // map to array
    return Array.from(m.values()).map(({ subject, title }) => ({
      subject,
      // removes the subject within the title
      title: title.replace(`(${subject})`, '').trim(),
    }));
  }
}
