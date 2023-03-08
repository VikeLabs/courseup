import { screen } from '@testing-library/react';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { renderWithSearchAndRouter } from 'lib/utils/jest';

import { HeaderContainer } from '../HeaderContainer';

jest.mock('lib/hooks/useSmallScreen');

const mockUseSmallScreen = jest.mocked(useSmallScreen);

describe('HeaderContainer', () => {
  beforeEach(() => {
    mockUseSmallScreen.mockReturnValue(false);
  });

  it('should render the header', () => {
    renderWithSearchAndRouter(<HeaderContainer />);

    expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
    // Since this value changes depending on how many tips there are (=== 1 has 6, > 1 has 8)
    expect(screen.getAllByRole('button').length === 6 || screen.getAllByRole('button').length === 8).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
