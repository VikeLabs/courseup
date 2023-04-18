import { render, screen } from '@testing-library/react';

import { useSavedTerm } from 'lib/hooks/useSavedTerm';

import { DisplayRequirement } from '../Requisites';

jest.mock('lib/hooks/useSavedTerm');

const mockUseSessionStorage = jest.mocked(useSavedTerm);
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
    mockUseSessionStorage.mockReturnValue(['202305', mockSetTerm]);
    render(DisplayRequirement(reqString, 1));
    expect(screen.getByTitle('Requisite')).toHaveTextContent('with a minimum GPA of 3.0 over all courses');
  });

  it('should render the course requirement', () => {
    mockUseSessionStorage.mockReturnValue(['202305', mockSetTerm]);
    render(
      DisplayRequirement(
        {
          subject: course.subject,
          code: course.code,
        },
        1
      )
    );
    expect(screen.getByTitle(`${course.subject} ${course.code}`)).toHaveTextContent('PHYS 216');
  });

  it('should render the nested requirement', () => {
    mockUseSessionStorage.mockReturnValue(['202305', mockSetTerm]);
    render(DisplayRequirement(reqNested, 1));
    expect(screen.getByTitle(`${reqNested.reqList[0].subject} ${reqNested.reqList[0].code}`)).toHaveTextContent(
      'PHYS 111'
    );
    expect(screen.getByTitle(`${reqNested.reqList[1].subject} ${reqNested.reqList[1].code}`)).toHaveTextContent(
      'PHYS 125'
    );
    expect(screen.getByTitle(`${reqNested.reqList[2].subject} ${reqNested.reqList[2].code}`)).toHaveTextContent(
      'PHYS 130'
    );
  });
});
