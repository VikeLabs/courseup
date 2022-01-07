import { render, screen } from '@testing-library/react';

import { RightSideButtons } from '../RightSideButtons';

describe('RightSideButtons', () => {
  it('should render both buttons', () => {
    render(<RightSideButtons />);

    expect(screen.getByLabelText('Open GitHub Repo')).toBeInTheDocument();
    expect(screen.getByLabelText('toggle dark mode')).toBeInTheDocument();
  });
});
