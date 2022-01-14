import { render, screen } from '@testing-library/react';
import { ShareLinkOptions } from '../ShareLinkOptions';

const slug: string = 'xGIvxVgsvCYa';

describe('ShareLinkOptions', () => {
  describe('when loading', () => {
    it('should not render any display link', () => {
      render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={true} />);
      expect(screen.queryByText('/s/xGIvxVgsvCYa')).not.toBeInTheDocument();
    });

    it('should display `Loading...` message', () => {
      render(<ShareLinkOptions slug={slug} isSmallScreen={false} loading={true} />);
      expect(screen.queryByDisplayValue('Loading...')).toBeInTheDocument();
    });
  });
});
