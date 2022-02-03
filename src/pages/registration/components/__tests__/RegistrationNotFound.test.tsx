import { render, screen } from '@testing-library/react';
import { getCurrentTerm, getReadableTerm } from 'lib/utils/terms';

import { axe } from 'jest-axe';
import { renderWithRouter } from 'lib/utils/jest/index';
import { MemoryRouter } from 'react-router';

import { RegistrationNotFound } from '../RegistrationNotFound';

const term = getCurrentTerm();

it('is in the document', () => {
    renderWithRouter(<RegistrationNotFound />, { route: `/${getCurrentTerm()}` });
    const renderComponent = screen.getByTestId('registration-component-1');
    expect(renderComponent).toBeInTheDocument();
    expect(renderComponent).toHaveTextContent(`${getReadableTerm(term)}`);
})

describe('RegistrationNotFound Component', () => {
    it('has no a11y violations', async () => {
        const { container } = render(<RegistrationNotFound />, { wrapper: MemoryRouter });
        expect(await axe(container)).toHaveNoViolations();
    });
});
