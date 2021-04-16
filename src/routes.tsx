import { BrowserRouter as Router, Routes as BrowserRoutes, Route } from 'react-router-dom';

import { MobileProvider } from './app/context/mobile/provider';
import { Calendar } from './calendar';
import { Hello } from './hello';

export function Routes(): JSX.Element {
  return (
    <MobileProvider>
      <Router>
        <BrowserRoutes>
          <Route path="/" element={<Calendar />} />
          <Route path="/hello" element={<Hello />} />
        </BrowserRoutes>
      </Router>
    </MobileProvider>
  );
}
