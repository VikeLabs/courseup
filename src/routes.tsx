import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { Calendar } from './pages/calendar';
import { Home } from './pages/home';
import { Scheduler } from './pages/scheduler';

// TODO: use nested routes but it doesn't work right now

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:term/*" element={<Calendar />} />
        <Route path="/schedule/" element={<Scheduler />} />
        <Route path="/schedule/:term/*" element={<Scheduler />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
