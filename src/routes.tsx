import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { Booklist } from 'pages/booklist';
import { Calendar } from 'pages/calendar';
import { Home } from 'pages/home';
import { Registration } from 'pages/registration';
import { SchedulePrint } from 'pages/schedulePrint';
import { Scheduler } from 'pages/scheduler';

// TODO: use nested routes but it doesn't work right now

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/calendar/:term/*" element={<Calendar />} />
        <Route path="/scheduler/" element={<Scheduler />} />
        <Route path="/scheduler/:term/*" element={<Scheduler />} />\
        <Route path="/scheduler/:term/print" element={<SchedulePrint />} />
        <Route path="/registration/:term" element={<Registration />} />
        <Route path="/booklist/:term" element={<Booklist />} />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
