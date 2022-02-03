import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MiscHeaderButtons } from '../MiscHeaderButtons';

describe('MiscHeaderButtons', () => {
  it('should render both buttons', () => {
    render(<MiscHeaderButtons />);

    expect(screen.getByLabelText('Open GitHub Repo')).toBeInTheDocument();
    expect(screen.getByLabelText('toggle dark mode')).toBeInTheDocument();
  });

  it('should have no a11y violations', async () => {
    const { container } = render(<MiscHeaderButtons />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
