import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MemoryRouter } from 'react-router';

import { renderWithRouter } from 'lib/utils/jest/index';
import { getCurrentTerm, getReadableTerm } from 'lib/utils/terms';

import { CoursesNotFound } from '../CoursesNotFound';

const term = getCurrentTerm();
it('is in the document', () => {
  renderWithRouter(<CoursesNotFound />, { route: `/${getCurrentTerm()}` });
  const renderComponent = screen.getByTestId('registration-component-1');
  expect(renderComponent).toBeInTheDocument();
  expect(renderComponent).toHaveTextContent(`${getReadableTerm(term)}`);
});

describe('RegistrationNotFound Component', () => {
  it('has no a11y violations', async () => {
    const { container } = render(<CoursesNotFound />, { wrapper: MemoryRouter });
    expect(await axe(container)).toHaveNoViolations();
  });
});
