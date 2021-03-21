import React from 'react';
import { BrowserRouter as Router, Routes as MyRoutes, Route } from 'react-router-dom';

import { App } from '../App';
export function Routes(): JSX.Element {
  return (
    <Router>
      <MyRoutes>
        <Route path="/" element={<App />} />
      </MyRoutes>
    </Router>
  );
}
