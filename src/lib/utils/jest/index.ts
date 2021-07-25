import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

// borrowed from: https://testing-library.com/docs/example-react-router/
export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};
