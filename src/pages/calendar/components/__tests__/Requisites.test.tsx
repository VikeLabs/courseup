import { render, screen } from '@testing-library/react';

import { displayRequirement } from '../Requisites';

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

describe('displayRequirement', () => {
  it('should render the string requirement', () => {
    render(displayRequirement(reqString, 1));
    expect(screen.getByTitle('string req')).toHaveTextContent('Some string');
  });

  it('should render the course requirement', () => {
    render(
      displayRequirement(
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
    render(displayRequirement(reqNested, 1));
    expect(screen.getByTitle('course req')).toHaveTextContent('PHYS 111');
    expect(screen.getByTitle('course req')).toHaveTextContent('PHYS 125');
    expect(screen.getByTitle('course req')).toHaveTextContent('PHYS 130');
  });
});
