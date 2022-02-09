import { PropsWithChildren, useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Term } from 'lib/fetchers';
import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils/terms';

import { Header } from 'common/header';
import { ContentSidebar } from 'common/sidebar';

type Props = {
  title?: string;
  hasSearchableSidebar?: boolean;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  mobileSupport?: boolean;
};

export function Page({ title, hasSearchableSidebar, leftSidebar, rightSidebar, children }: PropsWithChildren<Props>) {
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
      {/* {hasSearchableSidebar ? ( */}
      <Flex width="100%" overflowY="auto" pt="1.25rem" direction="column">
        {/* <ContentSidebar term={term as Term} searchQuery={query} /> */}
        {!hasSearchableSidebar && query.length > 0 ? (
          <ContentSidebar term={term as Term} searchQuery={query} />
        ) : (
          leftSidebar
        )}
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {children}
        </Flex>
        {rightSidebar}
      </Flex>
      {/* ) : (
        <Flex width="100%" pt="1.25rem" direction="column" alignItems="center" overflowY="auto">
          {children}
        </Flex>
      )} */}
    </Flex>
  );
}
