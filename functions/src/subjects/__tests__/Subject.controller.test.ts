// must use jest.mock before using ts-jest's mocked
jest.mock('../Subject.service.ts');

import * as request from 'supertest';
import * as express from 'express';
import { RegisterRoutes } from '../../../build/routes';

import { mocked } from 'ts-jest/utils';
import { SubjectsService } from '../Subject.service';
import { KualiSubject } from '@vikelabs/uvic-course-scraper/dist';

const mockSubjectsService = mocked(SubjectsService);

const app = express();
RegisterRoutes(app);

const { get } = request(app);

const mockSubjects: KualiSubject[] = [
  { subject: 'CSC', title: 'Computer Science' },
  { subject: 'SENG', title: 'Software Engineering' },
];

describe('Subjects Controller', () => {
  describe('GET /{term}', () => {
    beforeEach(() => {
      mockSubjectsService.getSubjects.mockResolvedValue(mockSubjects);
    });

    it('responds with the subjects for a term', async () => {
      const response = await get('/subjects/202109');
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(mockSubjects);
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.headers['cache-control']).toBe(
        'public, max-age=3600, s-max-age=1800'
      );
    });

    describe('when given an invalid term', () => {
      it('responds with a 400', async () => {
        const response = await get('/subjects/123456');
        expect(response.statusCode).toBe(400);
      });
    });
  });
});
