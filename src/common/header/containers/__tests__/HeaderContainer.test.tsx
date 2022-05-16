import { screen } from '@testing-library/react';

import { renderWithSearchAndRouter } from 'lib/utils/jest';

import { HeaderContainer } from '../HeaderContainer';

describe('HeaderContainer', () => {
  it('should render the header', () => {
    renderWithSearchAndRouter(<HeaderContainer />);

    expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(6);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
