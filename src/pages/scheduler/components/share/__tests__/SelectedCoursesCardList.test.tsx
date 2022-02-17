import { render, screen } from '@testing-library/react';

import { SavedCourse } from 'lib/hooks/useSavedCourses';

import { SelectedCoursesCardList, ShareCourseCard } from '../SelectedCoursesCardList';

const courses: SavedCourse[] = [
  { subject: 'CSC', code: '111', pid: '1', term: '202109', lecture: 'A01' },
  { subject: 'MATH', code: '100', pid: '2', term: '202109', lab: 'B01' },
  { subject: 'PHYS', code: '110', pid: '3', term: '202109', tutorial: 'T01' },
  { subject: 'ENGR', code: '130', pid: '4', term: '202109', lecture: 'A22', lab: 'B01' },
];

describe('SelectedCourseCardList', () => {
  describe('when courses are passed in', () => {
    it('should render the correct amount of course cards', () => {
      render(<SelectedCoursesCardList term="202109" courses={courses} />);
      expect(screen.getAllByTestId('card')).toHaveLength(4);
    });

    it('should filter out courses with no lecture/lab/tutorial', () => {
      render(
        <SelectedCoursesCardList
          term="202109"
          courses={[...courses, { subject: 'ENGR', code: '130', pid: '4', term: '202109' }]}
        />
      );
      expect(screen.getAllByTestId('card')).toHaveLength(4);
    });
  });

  describe('when no courses are passed in', () => {
    it('should show `Unable to find...` message', () => {
      render(<SelectedCoursesCardList term="202109" courses={[]} />);
      expect(screen.getByText('Unable to find saved courses for')).toBeInTheDocument();
    });
  });
});

describe('ShareCourseCard', () => {
  it('should render the correct subject and code', () => {
    render(<ShareCourseCard subject="CSC" code="111" color="#123456" lecture="A01" pid="1" term="202109" />);
    expect(screen.getByText('CSC 111')).toBeInTheDocument();
  });

  describe('when 1 section is passed in', () => {
    it('should render the lecture section', () => {
      render(<ShareCourseCard lecture="A21" subject="CSC" code="111" color="#123456" pid="1" term="202109" />);
      expect(screen.getByText('A21')).toBeInTheDocument();
    });

    it('should render the lab section', () => {
      render(<ShareCourseCard lab="B02" subject="CSC" code="111" color="#123456" pid="1" term="202109" />);
      expect(screen.getByText('B02')).toBeInTheDocument();
    });

    it('should render the tutorial section', () => {
      render(<ShareCourseCard tutorial="T09" subject="CSC" code="111" color="#123456" pid="1" term="202109" />);
      expect(screen.getByText('T09')).toBeInTheDocument();
    });
  });

  describe('when 2 sections are passed in', () => {
    it('should render the lecture first', () => {
      render(
        <ShareCourseCard lecture="A02" tutorial="T09" subject="CSC" code="111" color="#123456" pid="1" term="202109" />
      );
      expect(screen.getByText('A02 T09')).toBeInTheDocument();
    });
  });

  describe('when 3 sections are passed in', () => {
    it('should render the lecture, lab, then tutorial', () => {
      render(
        <ShareCourseCard
          lecture="A02"
          lab="B03"
          tutorial="T09"
          subject="CSC"
          code="111"
          color="#123456"
          pid="1"
          term="202109"
        />
      );
      expect(screen.getByText('A02 B03 T09')).toBeInTheDocument();
    });
  });
});
