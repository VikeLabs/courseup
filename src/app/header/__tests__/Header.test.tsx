import { render } from '@testing-library/react';

import { Header } from '../Header';

describe('Header', () => {
  it('renders the correct content', () => {
    expect(render(<Header />).container).toMatchSnapshot();
  });
});
