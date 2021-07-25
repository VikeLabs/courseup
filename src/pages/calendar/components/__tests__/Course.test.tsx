import { render, screen } from '@testing-library/react';

import { CourseInfo } from '../Course';

const subject = 'CSC';
const code = '111';
const title = 'Fun computer science stuff';
const description = 'A really great course';
const pid = 'abc123';
const term = '202101';

describe('Course', () => {
  it('should render the hours correctly', () => {
    render(
      <CourseInfo
        hours={{ lecture: '100', tutorial: '0', lab: '9' }}
        subject={subject}
        code={code}
        title={title}
        description={description}
        pid={pid}
        term={term}
      />
    );

    expect(screen.getByTitle('lecture hours per week')).toHaveTextContent('100');
    expect(screen.getByTitle('lab hours per week')).toHaveTextContent('9');
    expect(screen.getByTitle('tutorial hours per week')).toHaveTextContent('0');
  });

  describe('credits', () => {
    it('should display max and min credits when they differ', () => {
      render(
        <CourseInfo
          credits={{ credits: { max: '100', min: '12' }, chosen: 'yup', value: {} }}
          subject={subject}
          code={code}
          title={title}
          description={description}
          pid={pid}
          term={term}
        />
      );

      expect(screen.getByTitle('credits given for this course')).toHaveTextContent('12 ~ 100');
    });

    it('should display max credits when they are the same', () => {
      render(
        <CourseInfo
          credits={{ credits: { max: '100', min: '100' }, chosen: 'yup', value: {} }}
          subject={subject}
          code={code}
          title={title}
          description={description}
          pid={pid}
          term={term}
        />
      );

      expect(screen.getByTitle('credits given for this course')).toHaveTextContent('100');
    });
  });
});
