import { fireEvent, render, screen } from '@testing-library/react';

import { useNavigate, useParams } from 'react-router';

import { NavButtons } from '../NavButtons';

jest.mock('react-router');

const mockUseNavigate = jest.mocked(useNavigate);
const mockUseParams = jest.mocked(useParams);
const mockNavigate = jest.fn();

describe('NavButtons', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ term: '202109' });
    mockUseNavigate.mockReturnValue(mockNavigate);
  });
  it('should render all the buttons', () => {
    render(<NavButtons />);

    expect(screen.getByText('Explore courses')).toBeInTheDocument();
    expect(screen.getByText('Timetable')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Booklist')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('should navigate to the correct route', () => {
    render(<NavButtons />);

    const viewCourses = screen.getAllByRole('button')[0];
    fireEvent.click(viewCourses);
    expect(mockNavigate).toBeCalledWith('/calendar/202109');

    const timetable = screen.getAllByRole('button')[1];
    fireEvent.click(timetable);
    expect(mockNavigate).toBeCalledWith('/scheduler/202109');

    const register = screen.getAllByRole('button')[2];
    fireEvent.click(register);
    expect(mockNavigate).toBeCalledWith('/registration/202109');

    const booklist = screen.getAllByRole('button')[3];
    fireEvent.click(booklist);
    expect(mockNavigate).toBeCalledWith('/booklist/202109');
  });
});
