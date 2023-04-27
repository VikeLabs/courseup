import { screen, waitFor } from '@testing-library/react';

import { useLocation, useParams } from 'react-router';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { useTerm } from 'lib/hooks/useTerm';
import { renderWithSearch } from 'lib/utils/jest';

import { Page } from '../Page';

jest.mock('react-router');
jest.mock('lib/hooks/useSmallScreen');
jest.mock('lib/hooks/useTerm');

const mockUseTerm = jest.mocked(useTerm);
const mockUseLocation = jest.mocked(useLocation);
const mockUseParams = jest.mocked(useParams);
const mockUseSmallScreen = jest.mocked(useSmallScreen);

const mockLocation = { pathname: '/registration/' } as any;

describe('Page', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue(mockLocation);
    mockUseParams.mockReturnValue({ term: '202109' });
    mockUseTerm.mockReturnValue(['202109', jest.fn()]);
    mockUseSmallScreen.mockReturnValue(false);
  });

  it('should have the expected title', async () => {
    renderWithSearch(<Page title="Hello world" />);
    await waitFor(() => expect(document.title).toStrictEqual('Hello world'));
  });

  it('should render the children', () => {
    renderWithSearch(
      <Page>
        <p>what is up</p>
      </Page>
    );
    expect(screen.getByText('what is up')).toBeInTheDocument();
  });

  describe('when it has a left sidebar', () => {
    it('should render the sidebar', () => {
      renderWithSearch(<Page leftSidebar={<div data-testid="left">cool sidebar</div>} />);
      expect(screen.getByTestId('left')).toBeInTheDocument();
    });

    it('should render the children', () => {
      renderWithSearch(
        <Page leftSidebar={<div data-testid="left">cool sidebar</div>}>
          <p>what is up</p>
        </Page>
      );
      expect(screen.getByText('what is up')).toBeInTheDocument();
    });
  });

  describe('when it has a right sidebar', () => {
    it('should render the sidebar', () => {
      renderWithSearch(<Page rightSidebar={<div data-testid="right">cool sidebar</div>} />);
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });

    it('should render the children', () => {
      renderWithSearch(
        <Page rightSidebar={<div data-testid="right">cool sidebar</div>}>
          <p>what is up</p>
        </Page>
      );
      expect(screen.getByText('what is up')).toBeInTheDocument();
    });
  });

  describe('when it has a both sidebars', () => {
    it('should render the sidebar', () => {
      renderWithSearch(
        <Page
          rightSidebar={<div data-testid="right">cool sidebar</div>}
          leftSidebar={<div data-testid="left">even cooler sidebar</div>}
        />
      );
      expect(screen.getByTestId('right')).toBeInTheDocument();
      expect(screen.getByTestId('left')).toBeInTheDocument();
    });

    it('should render the children', () => {
      renderWithSearch(
        <Page
          rightSidebar={<div data-testid="right">cool sidebar</div>}
          leftSidebar={<div data-testid="left">even cooler sidebar</div>}
        >
          <p>what is up</p>
        </Page>
      );
      expect(screen.getByText('what is up')).toBeInTheDocument();
    });
  });
});
