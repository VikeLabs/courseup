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
    expect(screen.getAllByRole('button')).toHaveLength(6);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
