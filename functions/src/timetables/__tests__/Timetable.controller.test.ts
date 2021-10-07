import { mocked } from 'ts-jest/utils';
<<<<<<< HEAD
import { addTimetable, getTimetable } from '../Timetable.service';
=======
import {
  addTimetable,
  getTimetable,
  TimetableParams,
} from '../Timetable.service';
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2

import * as request from 'supertest';
import * as express from 'express';
import { RegisterRoutes } from '../../../build/routes';
<<<<<<< HEAD
=======
import { validationErrorHandler } from '../../middlewares/dataValidation';
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2

jest.mock('../Timetable.service.ts');

const mockGetTimetable = mocked(getTimetable);
const mockAddTimetable = mocked(addTimetable);

const app = express();
<<<<<<< HEAD
RegisterRoutes(app);

const { get, post } = request(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timetable: any = {
  slug: 'abc123',
=======

// Use body parser to read sent json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

// Need this to test the validation checks
app.use(validationErrorHandler);

const { get, put } = request(app);

const timetable: TimetableParams = {
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
  term: '202109',
  courses: [
    {
      subject: 'ACAN',
      code: '225',
      pid: 'ByS23Pp7E',
<<<<<<< HEAD
      lecture: 'A02',
      lab: 'B02',
=======
      lecture: ['A02'],
      lab: ['B02'],
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
      color: '#48BB78',
    },
  ],
};

<<<<<<< HEAD
=======
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

>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
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

<<<<<<< HEAD
  describe('POST /timetables', () => {
=======
  describe('PUT /timetables', () => {
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
    describe('on failure', () => {
      beforeEach(() => {
        mockAddTimetable.mockResolvedValue(null);
      });

<<<<<<< HEAD
      it('should return a 400 status', async () => {
        const response = await post('/timetables').send(timetable);
        expect(response.statusCode).toBe(400);
      });

      it('should return void', async () => {
        const response = await post('/timetables');
        expect(response.body).toStrictEqual({});
      });
=======
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

        it('should return validation error message', async () => {
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

      it('should return the data', async () => {
        const response = await put('/timetables').send(timetable);
        expect(response.body).toStrictEqual({
          courses: [
            {
              code: '225',
              color: '#48BB78',
              lab: ['B02'],
              lecture: ['A02'],
              pid: 'ByS23Pp7E',
              subject: 'ACAN',
            },
          ],
          slug: 'abc123',
          term: '202109',
        });
      });
>>>>>>> dd5b9d9d12d7f69c4460e64549aceba2f88d2da2
    });
  });
});
