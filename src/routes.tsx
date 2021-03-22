import { BrowserRouter as Router, Routes as BrowserRoutes, Route } from 'react-router-dom';

import { App } from './calendar';
import { Hello } from './hello';

export function Routes(): JSX.Element {
  return (
    <Router>
      <BrowserRoutes>
        <Route path="/" element={<App />} />
        <Route path="/hello" element={<Hello />} />
      </BrowserRoutes>
    </Router>
  );
}
