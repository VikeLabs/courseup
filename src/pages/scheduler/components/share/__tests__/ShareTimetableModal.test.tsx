import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SavedCourse } from 'lib/hooks/useSavedCourses';

import ShareTimetableModal from '../ShareTimetableModal';

const courses: SavedCourse[] = [
  { subject: 'CSC', code: '111', pid: '1', term: '202109', lecture: 'A01' },
  { subject: 'MATH', code: '100', pid: '2', term: '202109', lab: 'B01' },
  { subject: 'PHYS', code: '110', pid: '3', term: '202109', tutorial: 'T01' },
  { subject: 'ENGR', code: '130', pid: '4', term: '202109', lecture: 'A22', lab: 'B01' },
];

describe('ShareTimetableModal', () => {
  describe('when sending params in', () => {
    it('should display the correct term in readable format', () => {
      render(
        <ShareTimetableModal
          term={'202109'}
          loading={false}
          onClose={() => {}}
          isOpen={true}
          inSession_savedCourses={[]}
          timetable={{}}
        />
      );
      expect(screen.getByText('Share your Fall 2021 timetable')).toBeInTheDocument();
    });

    it('should display the correct number of cards', () => {
      render(
        <ShareTimetableModal
          term={'202109'}
          loading={false}
          onClose={() => {}}
          isOpen={true}
          inSession_savedCourses={courses}
          timetable={{}}
        />
      );
      expect(screen.getAllByTestId('card')).toHaveLength(4);
    });

    it('should call the correct function onClose', () => {
      const mock = jest.fn(() => {});
      render(
        <ShareTimetableModal
          term={'202109'}
          loading={false}
          onClose={mock}
          isOpen={true}
          inSession_savedCourses={[]}
          timetable={{}}
        />
      );
      expect(mock).toHaveBeenCalledTimes(0);
      userEvent.click(screen.getAllByRole('button')[0]);
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
