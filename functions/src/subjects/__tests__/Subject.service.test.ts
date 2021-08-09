// must use jest.mock before using ts-jest's mocked
jest.mock('@vikelabs/uvic-course-scraper/dist');

import {
  KualiSubject,
  UVicCourseScraper,
} from '@vikelabs/uvic-course-scraper/dist';
import { SubjectsService } from '../Subject.service';
import { mocked } from 'ts-jest/utils';

const mockedUVicCourseScraper = mocked(UVicCourseScraper);

const mockSubjects: KualiSubject[] = [
  { subject: 'CSC', title: 'Computer Science (CSC) ' },
  { subject: 'SENG', title: 'Software Engineering (SENG) ' },
];

describe('Subjects service', () => {
  describe('getSubjects', () => {
    beforeEach(() => {
      mockedUVicCourseScraper.getSubjects.mockResolvedValue(mockSubjects);
    });

    it('correctly returns the subjects with titles trimmed', async () => {
      const subjects = await SubjectsService.getSubjects('202109');

      expect(subjects[0].title).toBe('Computer Science');
      expect(subjects[0].subject).toBe('CSC');
      expect(subjects[1].title).toBe('Software Engineering');
      expect(subjects[1].subject).toBe('SENG');
    });
  });
});
