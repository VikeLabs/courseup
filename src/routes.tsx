import { useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes as ReactRouterRoutes, Route, useParams } from 'react-router-dom';

import { Term } from 'lib/fetchers';
import { getCurrentTerm } from 'lib/utils';

import { Header } from 'common/header';
import { SidebarTemplate } from 'common/sidebar';

import { Calendar } from 'pages/calendar';
import { Home } from 'pages/home';
import { Registration } from 'pages/registration';
import { Scheduler } from 'pages/scheduler';

// TODO: use nested routes but it doesn't work right now
export function Routes(): JSX.Element {
  const [query, setQuery] = useState('');
  const { term } = useParams();

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <BrowserRouter>
      <Flex h="100vh" direction="column">
        <Header onSearchChange={handleSearchChange} />
        <ReactRouterRoutes>
          <Route path="/" element={<Home />} />
          <Route
            path="/calendar"
            element={
              <SidebarTemplate title="Calendar" term={(term as Term) ?? getCurrentTerm()} query={query}>
                <Calendar />
              </SidebarTemplate>
            }
          />
          <Route
            path="/calendar/:term/*"
            element={
              <SidebarTemplate title="Calendar" term={(term as Term) ?? getCurrentTerm()} query={query}>
                <Calendar />
              </SidebarTemplate>
            }
          />
          <Route
            path="/scheduler/"
            element={
              <SidebarTemplate title="Scheduler" term={(term as Term) ?? getCurrentTerm()} query={query}>
                <Scheduler />
              </SidebarTemplate>
            }
          />
          <Route
            path="/scheduler/:term/*"
            element={
              <SidebarTemplate title="Scheduler" term={(term as Term) ?? getCurrentTerm()} query={query}>
                <Scheduler />
              </SidebarTemplate>
            }
          />
          <Route path="/registration/:term" element={<Registration />} />
        </ReactRouterRoutes>
      </Flex>
    </BrowserRouter>
  );
}
