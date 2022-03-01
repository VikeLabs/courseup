import { axe } from 'jest-axe';

import { renderWithRouter } from 'lib/utils/jest';

import { Landing } from 'pages/home/containers/Landing';

describe('Landing', () => {
  it('has no a11y violations', async () => {
    const { container } = renderWithRouter(<Landing />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
