import { render, screen } from '@testing-library/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';

import { DisplayRequirement } from '../Requisites';

jest.mock('lib/hooks/storage/useSessionStorage');

const mockUseSessionStorage = jest.mocked(useSessionStorage);
const mockSetTerm = jest.fn();

const reqString = 'with a minimum GPA of 3.0 over all courses.';
const course = { subject: 'PHYS', code: '216' };
const reqNested = {
  quantity: 1,
  reqList: [
    { subject: 'PHYS', code: '111' },
    { subject: 'PHYS', code: '125' },
    { subject: 'PHYS', code: '130' },
  ],
};

describe('DisplayRequirement', () => {
  it('should render the string requirement', () => {
    mockUseSessionStorage.mockReturnValue([true, mockSetTerm]);
    render(DisplayRequirement(reqString, 1));
    expect(screen.getByTitle('string req')).toHaveTextContent('with a minimum GPA of 3.0 over all courses');
  });

  it('should render the course requirement', () => {
    mockUseSessionStorage.mockReturnValue([true, mockSetTerm]);
    render(
      DisplayRequirement(
        {
          subject: course.subject,
          code: course.code,
        },
        1
      )
    );
    expect(screen.getByTitle('course req')).toHaveTextContent('PHYS 216');
  });

  it('should render the nested requirement', () => {
    mockUseSessionStorage.mockReturnValue([true, mockSetTerm]);
    render(DisplayRequirement(reqNested, 1));
    expect(screen.getAllByTitle('course req')[0]).toHaveTextContent('PHYS 111');
    expect(screen.getAllByTitle('course req')[1]).toHaveTextContent('PHYS 125');
    expect(screen.getAllByTitle('course req')[2]).toHaveTextContent('PHYS 130');
  });
});
