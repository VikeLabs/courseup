jest.mock('randomstring');

import { mockFirebase } from 'firestore-jest-mock';

type MockTimetableDoc = TimetableDoc & { id: string };
type MockCourseDoc = CourseDoc & { id: string };

// need to mock before importing the functions that call Firestore
mockFirebase(
  {
    database: {
      timetables: [
        {
          term: '202109',
          id: '1',
          hash: '1234556562345235134124124',
          courses: [
            {
              subject: 'CSC',
              code: '111',
              pid: 'abc123',
              lecture: ['A01'],
              color: '#12345',
            },
          ],
        },
        {
          term: '202109',
          id: '2',
          hash: 'dbvsfvdsvadvfasd',
          courses: [
            {
              subject: 'ADMN',
              code: '200',
              pid: '123abc',
              lecture: ['A02'],
              lab: ['B03'],
              color: '#12345',
            },
          ],
        },
      ] as MockTimetableDoc[],
      courses: [
        {
          subject: 'MATH',
          code: '100',
          pid: '1234abcd',
          term: '202109',
          id: '202109MATH100',
        },
      ] as MockCourseDoc[],
    },
  },
  { simulateQueryFilters: true }
);

import {
  addTimetable,
  getTimetable,
  hasValidCourses,
} from '../Timetable.service';
import { CourseDoc, TimetableDoc } from '../../db/collections';
import { generate } from 'randomstring';
import { mocked } from 'ts-jest/utils';

const mockGenerateSlug = mocked(generate);

describe('Timetable service', () => {
  describe('getTimetable', () => {
    describe('on success', () => {
      it('should return the correct timetable data', async () => {
        const timetable = await getTimetable('2');
        expect(timetable).toStrictEqual({
          term: '202109',
          courses: [
            {
              subject: 'ADMN',
              code: '200',
              pid: '123abc',
              lecture: ['A02'],
              lab: ['B03'],
              color: '#12345',
            },
          ],
        });
      });
    });

    describe('on failure', () => {
      it('should return null', async () => {
        const timetable = await getTimetable('this does not exist');
        expect(timetable).toBeNull();
      });
    });
  });

  describe('addTimetable', () => {
    beforeEach(() => {
      mockGenerateSlug.mockReturnValue('new-slug');
    });

    describe('when validation succeeds', () => {
      it('should return the correct data', async () => {
        const data = await addTimetable(
          [
            {
              subject: 'MATH',
              code: '100',
              pid: '1234abcd',
              lecture: ['A02'],
              lab: ['B03'],
              tutorial: ['T02'],
              color: '#12345',
            },
          ],
          '202109'
        );

        expect(data).toStrictEqual({
          slug: 'new-slug',
          term: '202109',
          courses: [
            {
              subject: 'MATH',
              code: '100',
              pid: '1234abcd',
              lecture: ['A02'],
              lab: ['B03'],
              tutorial: ['T02'],
              color: '#12345',
            },
          ],
        });
      });
    });

    describe('when validation fails', () => {
      describe('when there is greater than 12 courses', () => {
        it('should return null', async () => {
          const thirteenCourses = Array(13).fill({
            subject: 'ACAN',
            code: '225',
            pid: 'ByS23Pp7E',
            lecture: ['A01'],
            color: '#12345',
          });

          const data = await addTimetable(thirteenCourses, '202109');

          expect(data).toBeNull();
        });
      });

      describe('when a course is not in the database', () => {
        it('should return null', async () => {
          const course = {
            subject: 'RDMN',
            code: '123',
            pid: 'abc123',
            lecture: ['A01'],
            color: '#12345',
          };

          const data = await addTimetable([course], '202109');

          expect(data).toBeNull();
        });
      });
    });
  });

  describe('hasValidCourses', () => {
    describe('when there are no courses', () => {
      it('should work right', async () => {
        expect(await hasValidCourses([], '202109')).toBeFalsy();
      });
    });

    describe('when the PID does not match', () => {
      it('should return false', async () => {
        expect(
          await hasValidCourses(
            [
              {
                subject: 'MATH',
                code: '100',
                pid: 'wrong',
                lecture: ['A02'],
                lab: ['B03'],
                color: '#12345',
              },
            ],
            '202109'
          )
        ).toBeFalsy();
      });
    });

    describe('when the courses are valid', () => {
      it('should return true', async () => {
        expect(
          await hasValidCourses(
            [
              {
                subject: 'MATH',
                code: '100',
                pid: '1234abcd',
                lecture: ['A02'],
                lab: ['B03'],
                color: '#12345',
              },
            ],
            '202109'
          )
        ).toBeTruthy();
      });
    });
  });
});
