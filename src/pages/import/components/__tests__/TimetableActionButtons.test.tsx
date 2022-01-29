import { screen } from '@testing-library/react';

import { Timetable, TimetableCourse } from 'lib/fetchers';
import { renderWithRouter } from 'lib/utils/jest';

import { TimetableActionButtons } from '../TimetableActionButtons';

const courses: TimetableCourse[] = [
  { code: '373', color: '#F56565', lab: ['B01'], lecture: ['A01'], pid: 'Bk24BupmN', subject: 'GEOG' },
  { code: '324', color: '#48BB78', lecture: ['A01'], pid: 'H1H7Bd6XV', subject: 'GEOG' },
  { code: '391', color: '#4299E1', lecture: ['A01'], pid: 'rJMSr_67V', subject: 'GEOG' },
  { code: '407', color: '#ED8936', lecture: ['A01'], pid: 'B1gBVuamE', subject: 'ES' },
];

const sample_timetable: Timetable = { courses: courses, term: '202201' };

describe('TimetableActionButtons', () => {
  describe('when it is rendered', () => {
    it('should always display 2 buttons', () => {
      renderWithRouter(<TimetableActionButtons loading={false} data={sample_timetable} />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });
});
