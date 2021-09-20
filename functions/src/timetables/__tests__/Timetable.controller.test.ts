import { mocked } from 'ts-jest/utils';
import { addTimetable, getTimetable } from '../Timetable.service';

import * as request from 'supertest';
import * as express from 'express';
import { RegisterRoutes } from '../../../build/routes';

jest.mock('../Timetable.service.ts');

const mockGetTimetable = mocked(getTimetable);
const mockAddTimetable = mocked(addTimetable);

const app = express();
RegisterRoutes(app);

const { get, put } = request(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timetable: any = {
  slug: 'abc123',
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
      lecture: 'A02',
      lab: 'B02',
      color: '#48BB78',
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

      it('should return a 404 status', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.statusCode).toBe(404);
      });

      it('should return void', async () => {
        const response = await put('/timetables');
        expect(response.body).toStrictEqual({});
      });
    });
  });
});
