import { fireEvent, screen } from '@testing-library/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { renderWithRouter } from 'lib/utils/jest';

import { Banner } from '../Banner';

jest.mock('lib/hooks/storage/useSessionStorage');

const mockUseSessionStorage = jest.mocked(useSessionStorage);
const mockSetBanner = jest.fn();

// I chose to not test the forward and back buttons as the content of the banner
// is dynamic and might not always have that format, would be annoying to change tests for a minor thing
describe('Banner', () => {
  it('should be visible when session storage is true', () => {
    mockUseSessionStorage.mockReturnValue([true, mockSetBanner]);
    renderWithRouter(<Banner />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should call setBanner when close button pressed', () => {
    mockUseSessionStorage.mockReturnValue([true, mockSetBanner]);
    renderWithRouter(<Banner />);

    const closeButton = screen.getAllByRole('button')[0];
    fireEvent.click(closeButton);
    expect(mockSetBanner).toBeCalledWith(false);
  });

  it('should not be visible when session storage is false', () => {
    mockUseSessionStorage.mockReturnValue([false, mockSetBanner]);
    renderWithRouter(<Banner />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
