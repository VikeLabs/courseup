import { screen, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { useLocation, useParams } from 'react-router';

import { renderWithSearch } from 'lib/utils/jest';

import { ContentSidebar } from 'common/sidebar';

import { Page } from '../Page';

jest.mock('common/sidebar');
jest.mock('react-router');

const mockUseParams = mocked(useParams);
const mockUseLocation = mocked(useLocation);
const mockContentSidebar = mocked(ContentSidebar);

const mockLocation = { pathname: '/registration/' } as any;

describe('Page', () => {
  beforeEach(() => {
    mockUseLocation.mockReturnValue(mockLocation);
    mockUseParams.mockReturnValue({ term: '202109' });
    mockContentSidebar.mockImplementation(({ term, searchQuery }) => (
      <div data-testid="sidebar">
        {searchQuery}
        {term}
      </div>
    ));
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

  describe('when hasSearchableSidebar is true', () => {
    it('should render the sidebar', () => {
      renderWithSearch(<Page hasSearchableSidebar />);
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('should render the children', () => {
      renderWithSearch(
        <Page hasSearchableSidebar>
          <p>what is up</p>
        </Page>
      );
      expect(screen.getByText('what is up')).toBeInTheDocument();
    });
  });
});
