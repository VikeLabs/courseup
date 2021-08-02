import { mockFirebase } from 'firestore-jest-mock';
import { TimetableDoc } from '../../db/collections';

type MockTimetableDoc = TimetableDoc & { id: string };

mockFirebase({
  database: {
    timetables: [
      {
        term: '202109',
        id: '1',
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
    ] as MockTimetableDoc[],
  },
});

import { getTimetable } from '../Timetable.service';

describe('Timetable service', () => {
  describe('getTimetable', () => {
    describe('when the timetable exists', () => {
      it('should return the timetable from Firestore', async () => {
        const timetable = await getTimetable('1');
        expect(timetable).not.toBeNull();
      });
      it.todo('should return the timetable with the given slug');
    });

    describe('on failure', () => {
      it.todo('should have a 404 status');
    });
  });
});
