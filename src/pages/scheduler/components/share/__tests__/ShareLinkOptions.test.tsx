import { render, screen } from '@testing-library/react';

import { ShareLinkOptions } from '../ShareLinkOptions';

const slug: string = 'xGIvxVgsvCYa';

describe('ShareLinkOptions', () => {
  describe('when loading', () => {
    it('should not render any display link', () => {
      const { container } = render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={true} />);
      expect(container).not.toHaveTextContent('/s/xGIvxVgsvCYa');
    });

    it('should display `Loading...` message', () => {
      render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={true} />);
      expect(screen.getByDisplayValue('Loading...')).toBeInTheDocument();
    });
  });

  describe('when sending a slug', () => {
    it('should correctly render the display link', () => {
      render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={false} />);
      expect(screen.getByDisplayValue(window.location.hostname + '/s/xGIvxVgsvCYa')).toBeInTheDocument();
    });

    it('should show five React social media buttons and one copy button', () => {
      render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={false} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6);
    });
  });
});
