import { mocked } from 'ts-jest/utils';
import {
  addTimetable,
  getTimetable,
  TimetableReturn,
} from '../Timetable.service';

import * as request from 'supertest';
import * as express from 'express';
import { RegisterRoutes } from '../../../build/routes';
import { Timetable } from '../Timetable.model';

jest.mock('../Timetable.service.ts');

const mockGetTimetable = mocked(getTimetable);
const mockAddTimetable = mocked(addTimetable);

const app = express();
RegisterRoutes(app);

const { get, put } = request(app);

const timetable: Timetable = {
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
      lecture: ['A02'],
      lab: ['B02'],
      color: '#48BB78',
    },
  ],
};

const timetableWithSlug: TimetableReturn = {
  slug: 'abc123',
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
      lecture: ['A02'],
      lab: ['B02'],
      color: '#48BB78',
    },
  ],
};

const invalidTimetable: Timetable = {
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
      lecture: ['B0213412'],
      lab: ['T02'],
      color: '#1',
    },
  ],
};

const invalidTimetableWithSlug: TimetableReturn = {
  slug: 'abc123',
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
      lecture: ['B0213412'],
      lab: ['T02'],
      color: '#1',
    },
  ],
};

describe('Timetable controller', () => {
  describe('GET /{slug}', () => {
    describe('on failure', () => {
      beforeEach(() => {
        mockGetTimetable.mockResolvedValue(null);
      });

      it('should return a 404 status', async () => {
        const response = await get('/timetables/abc123');
        expect(response.statusCode).toBe(404);
      });

      it('should return nothing', async () => {
        const response = await get('/timetables/abc123');
        expect(response.body).toStrictEqual({});
      });
    });

    describe('on success', () => {
      beforeEach(() => {
        mockGetTimetable.mockResolvedValue(timetable);
      });

      it('should return a 200 status', async () => {
        const response = await get('/timetables/abc123');
        expect(response.statusCode).toBe(200);
      });

      it('should return the expected timetable', async () => {
        const response = await get('/timetables/abc123');
        expect(response.body).toStrictEqual(timetable);
      });
    });
  });

  describe('PUT /timetables', () => {
    describe('on failure', () => {
      beforeEach(() => {
        mockAddTimetable.mockResolvedValue(null);
      });

      describe('when validation fails', () => {
        beforeEach(() => {
          mockAddTimetable.mockResolvedValue(invalidTimetableWithSlug);
        });

        it('should return a 422 status', async () => {
          const response = await put('/timetables').send(invalidTimetable);
          expect(response.statusCode).toBe(422);
        });

        it('should return void', async () => {
          const response = await put('/timetables');
          expect(response.body).toStrictEqual({});
        });
      });

      it('should return a 422 status', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.statusCode).toBe(422);
      });

      it('should return void', async () => {
        const response = await put('/timetables');
        expect(response.body).toStrictEqual({});
      });
    });

    describe('on success', () => {
      beforeEach(() => {
        mockAddTimetable.mockResolvedValue(timetableWithSlug);
      });

      it('should return a 201 status', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.statusCode).toBe(201);
      });
    });
  });
});
