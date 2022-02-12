import { PropsWithChildren, useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useParams } from 'react-router';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils/terms';

import { Header } from 'common/header';
import { Sidebar } from 'common/sidebar/containers/Sidebar';
import { SearchResults } from 'common/sidebar/variants/SearchResults';

type Props = {
  title?: string;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  mobileSupport?: boolean;
};

export function Page({ title, leftSidebar, rightSidebar, children }: PropsWithChildren<Props>) {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();

  const { term } = useParams();

  const route = location.pathname.split('/')[1];

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else if (route) {
      navigate(`/${route}/${savedTerm}`, { replace: true });
    }
  }, [navigate, route, savedTerm, setSavedTerm, term]);

  return (
    <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header onSearchChange={handleSearchChange} />
      <Flex overflowY="auto" h="100%">
        {query.length > 0 ? (
          <Sidebar>
            <SearchResults />
          </Sidebar>
        ) : (
          leftSidebar && <Sidebar>{leftSidebar}</Sidebar>
        )}
        <Flex overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56} w="100%">
          {children}
        </Flex>
        {rightSidebar && <Sidebar>{rightSidebar}</Sidebar>}
      </Flex>
    </Flex>
  );
}
