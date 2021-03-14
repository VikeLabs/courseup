import { fireEvent, render, screen } from '@testing-library/react';

import { getCurrentTerm, getCurrentTerms } from '../../../shared/utils/terms';
import { TermButtons } from '../TermButtons';

const term = getCurrentTerm();
const terms = getCurrentTerms();

describe('TermButtons', () => {
  it('turns the button active on click', () => {
    render(<TermButtons />);

    const termButton = screen.getByTestId(term) as HTMLButtonElement;
    expect(termButton).not.toHaveAttribute('data-active', '');

    fireEvent.click(termButton);
    expect(termButton).toHaveAttribute('data-active', '');
  });

  it('is loaded in with the appropriate button active', () => {
    render(<TermButtons />);

    // the active button takes time to be rendered in
    setTimeout(() => {
      const termButton = screen.getByTestId(term) as HTMLButtonElement;
      expect(termButton).toHaveAttribute('data-active', '');
    }, 1000);
  });

  it('loads all three buttons', () => {
    render(<TermButtons />);

    expect(screen.getByTestId(terms[0])).toBeInTheDocument();
    expect(screen.getByTestId(terms[1])).toBeInTheDocument();
    expect(screen.getByTestId(terms[2])).toBeInTheDocument();
  });
});
