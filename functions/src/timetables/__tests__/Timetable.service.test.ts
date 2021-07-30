import { mockFirebase } from 'firestore-jest-mock';
import * as admin from 'firebase-admin';

mockFirebase({
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
  },
});

describe('Timetable service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    admin.initializeApp({
      projectId: 'test',
    });
  });

  describe('getTimetable', () => {
    describe('on success', () => {
      it.todo('should have a 200 status');
      it.todo('should return the timetable with the given slug');
    });

    describe('on failure', () => {
      it.todo('should have a 404 status');
    });
  });
});
