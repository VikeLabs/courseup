import { mocked } from 'ts-jest/utils';
import {
  addTimetable,
  getTimetable,
  TimetableParams,
  TimetableReturn,
} from '../Timetable.service';

import * as request from 'supertest';
import * as express from 'express';
import { Response as ExResponse, Request as ExRequest } from 'express';
import { RegisterRoutes } from '../../../build/routes';
import { ValidateError } from '@tsoa/runtime';

jest.mock('../Timetable.service.ts');

const mockGetTimetable = mocked(getTimetable);
const mockAddTimetable = mocked(addTimetable);

const app = express();

// Use body parser to read sent json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

// Need this to test the validation checks
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: express.NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

const { get, put } = request(app);

const timetable: TimetableParams = {
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

const invalidTimetable: TimetableParams = {
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

      it('should return a 422 status', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.statusCode).toBe(422);
      });

      it('should return void', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.body).toStrictEqual({});
      });

      describe('when validation fails', () => {
        beforeEach(() => {
          mockAddTimetable.mockResolvedValue({
            ...invalidTimetable,
            slug: 'abc123',
          });
        });

        it('should return a 422 status', async () => {
          const response = await put('/timetables').send(invalidTimetable);
          expect(response.statusCode).toBe(422);
        });

        it('should return va.idation error message', async () => {
          const response = await put('/timetables').send(invalidTimetable);
          expect(response.body.message).toStrictEqual('Validation Failed');
        });
      });
    });

    describe('on success', () => {
      beforeEach(() => {
        mockAddTimetable.mockResolvedValue({ ...timetable, slug: 'abc123' });
      });

      it('should return a 201 status', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.statusCode).toBe(201);
      });
    });
  });
});
