import { render, screen } from '@testing-library/react';

import { HeaderContainer } from '../HeaderContainer';

describe('HeaderContainer', () => {
  describe('when the window width is less than 1020px', () => {
    it('should render the mobile header', () => {});
  });

  describe('when the window width is larger than 1020px', () => {
    it('should render the desktop header', () => {
      render(<HeaderContainer />);

      expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
    });
  });
});
