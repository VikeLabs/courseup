import { render } from '@testing-library/react';

import { InstantSearch } from 'react-instantsearch-core';

jest.mock('algoliasearch');

const searchClient = { search: jest.fn() };

// to be used if the component you are testing has the search field in it
export const renderWithSearch = (ui: JSX.Element) => {
  return render(
    <InstantSearch indexName="testing" searchClient={searchClient}>
      {ui}
    </InstantSearch>
  );
};

// I know this is sus but it works so
export const renderWithSearchAndRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <InstantSearch indexName="testing" searchClient={searchClient}>
      {ui}
    </InstantSearch>
  );
};
