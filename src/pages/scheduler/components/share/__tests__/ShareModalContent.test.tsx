import { render, screen } from '@testing-library/react';

import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { ShareModalContent } from '../ShareModalContent';

const courses: SavedCourse[] = [
  { subject: 'CSC', code: '111', pid: '1', term: '202109', lecture: 'A01' },
  { subject: 'MATH', code: '100', pid: '2', term: '202109', lab: 'B01' },
  { subject: 'PHYS', code: '110', pid: '3', term: '202109', tutorial: 'T01' },
  { subject: 'ENGR', code: '130', pid: '4', term: '202109', lecture: 'A22', lab: 'B01' },
];

describe('ShareModalContent', () => {
  describe('when sending params in', () => {
    it('should display the correct term in readable format', () => {
      render(
        <ShareModalContent courses={courses} isSmallScreen={false} timetable={{}} term={'202109'} loading={false} />
      );
      expect(
        screen.getByText(
          "We've generated a link that you can share to allow people to view, compare, and import the courses and sections you currently have selected for the Fall 2021 term."
        )
      ).toBeInTheDocument();
    });
  });
});
