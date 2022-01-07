import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-core';
import { BrowserRouter } from 'react-router-dom';

jest.mock('algoliasearch');

const searchClient = mocked(algoliasearch);

// borrowed from: https://testing-library.com/docs/example-react-router/
export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

// to be used if the component you are testing has the search field in it
export const renderWithSearch = (ui: JSX.Element) => {
  return render(
    <InstantSearch indexName="testing" searchClient={searchClient}>
      {ui}
    </InstantSearch>
  );
};
