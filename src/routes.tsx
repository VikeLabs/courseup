import { PropsWithChildren, useState } from 'react';

import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { BrowserRouter, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { Term } from 'lib/fetchers';

import { Header } from 'common/header';
import { SidebarTemplate } from 'common/sidebar';

import { Calendar } from 'pages/calendar';
import { Home } from 'pages/home';
import { Registration } from 'pages/registration';
import { Scheduler } from 'pages/scheduler';

// TODO: use nested routes but it doesn't work right now
type Props = {
  search?: boolean;
  title: string;
};

function RouteContainer({ children, search, title }: PropsWithChildren<Props>): JSX.Element {
  const { term } = useParams();
  const [query, setQuery] = useState('');

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Box h="100vh">
      <Header onSearchChange={search ? handleSearchChange : undefined} />
      {search ? (
        <SidebarTemplate children={children} term={term as Term} title={title} query={query} />
      ) : (
        <>{children}</>
      )}
    </Box>
  );
}

export function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <ReactRouterRoutes>
        <Route path="/" element={<RouteContainer children={<Home />} title="home" />} />
        <Route path="/calendar" element={<RouteContainer children={<Calendar />} title="Calendar" search />} />
        <Route path="/calendar/:term/*" element={<RouteContainer children={<Calendar />} title="Calendar" search />} />
        <Route path="/scheduler/" element={<RouteContainer children={<Scheduler />} title="Scheduler" search />} />
        <Route
          path="/scheduler/:term/*"
          element={<RouteContainer children={<Scheduler />} title="Scheduler" search />}
        />
        <Route
          path="/registration/:term"
          element={<RouteContainer children={<Registration />} title="Registraion" />}
        />
      </ReactRouterRoutes>
    </BrowserRouter>
  );
}
