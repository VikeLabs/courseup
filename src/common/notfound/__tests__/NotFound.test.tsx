import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { useParams } from 'react-router';

import { renderWithSearch } from 'lib/utils/jest/index';

import { NotFound } from '../NotFound';

jest.mock('react-router');

const mockUseParams = jest.mocked(useParams);

describe('NotFound Component', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ term: '202109' });
  });

  it('has no a11y violations', async () => {
    const { container } = renderWithSearch(<NotFound item="Not Found" term="202204" timetableButton timetable />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render the text correctly', () => {
    const { container } = render(<NotFound item="Not found" term="202204" timetableButton timetable />);
    expect(container.textContent).toContain('Not found');
    expect(container.textContent).toContain('timetable');
  });
});
