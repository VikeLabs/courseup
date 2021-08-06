import { mockGoogleCloudFirestore } from 'firestore-jest-mock';
import * as admin from 'firebase-admin';

import { addTimetable, getTimetable } from '../Timetable.service';

mockGoogleCloudFirestore({
  database: {
    timetables: [
      {
        term: '202109',
        id: '1',
        slug: '1',
        courses: [
          {
            subject: 'CSC',
            code: '111',
            pid: 'abc123',
            lecture: 'A01',
            color: '#12345',
          },
        ],
      },
      {
        term: '202109',
        id: '2',
        slug: '2',
        courses: [
          {
            subject: 'ADMN',
            code: '200',
            pid: '123abc',
            lecture: 'A02',
            lab: 'B03',
            color: '#12345',
          },
        ],
      },
    ],
    courses: [
      {
        subject: 'ACAN',
        code: '225',
        pid: 'ByS23Pp7E',
        term: '202109',
        id: 'yo',
      },
    ],
  },
});

admin.initializeApp({
  projectId: 'test',
});

describe('Timetable service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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
              lecture: 'A02',
              lab: 'B03',
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
    describe('when validation fails', () => {
      describe('when there is greater than 12 courses', () => {
        it('should return null', async () => {
          const thirteenCourses = Array(13).fill({
            subject: 'ACAN',
            code: '225',
            pid: 'ByS23Pp7E',
            lecture: 'A01',
            color: '#12345',
          });

          const data = await addTimetable(thirteenCourses, '202109');

          expect(data).toBeNull();
        });
      });

      describe('when there a course is not in the database', () => {
        it('should return null', async () => {
          const course = {
            subject: 'RDMN',
            code: '123',
            pid: 'abc123',
            lecture: 'A01',
            color: '#12345',
          };

          const data = await addTimetable([course], '202109');

          expect(data).toBeNull();
        });
      });
    });
  });
});
