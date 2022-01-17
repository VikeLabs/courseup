import { render } from '@testing-library/react';
import { Timetable, TimetableCourse } from 'lib/fetchers';
import { ImportCalendar } from '../ImportCalendar';

const courses: TimetableCourse[] = [
  { code: '373', color: '#F56565', lab: ['B01'], lecture: ['A01'], pid: 'Bk24BupmN', subject: 'GEOG' },
  { code: '324', color: '#48BB78', lecture: ['A01'], pid: 'H1H7Bd6XV', subject: 'GEOG' },
  { code: '391', color: '#4299E1', lecture: ['A01'], pid: 'rJMSr_67V', subject: 'GEOG' },
  { code: '407', color: '#ED8936', lecture: ['A01'], pid: 'B1gBVuamE', subject: 'ES' },
];

const sample_timetable: Timetable = { courses: courses, term: '202201' };

describe('ImportCalendar', () => {
  describe('when proper Timetable type object is passed in', () => {
    it('should correctly map to the right number of course calendar events', () => {
      const { container } = render(<ImportCalendar data={sample_timetable} />);
      const events = container.getElementsByClassName('rbc-event');
      expect(events).toHaveLength(8);
    });
  });
});
