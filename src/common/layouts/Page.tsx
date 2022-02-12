import { PropsWithChildren, useEffect, useState } from 'react';

import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useParams } from 'react-router';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils/terms';

import { Header } from 'common/header';
import { Mobile } from 'common/mobile';
import { Sidebar } from 'common/sidebar/containers/Sidebar';
import { SearchResults } from 'common/sidebar/variants/SearchResults';

type Props = {
  title?: string;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  mobileSupport?: boolean;
};

export function Page({ title, leftSidebar, rightSidebar, mobileSupport, children }: PropsWithChildren<Props>) {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
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
    <>
      {!mobileSupport && <Mobile />}
      <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header onSearchChange={handleSearchChange} />
        <Flex overflowY="auto" h="100%">
          {!isMobile && query.length > 0 ? (
            <Sidebar>
              <SearchResults />
            </Sidebar>
          ) : (
            leftSidebar && !isMobile && <Sidebar>{leftSidebar}</Sidebar>
          )}
          <Flex overflow="auto" zIndex={56} w="100%" justifyContent="center">
            {isMobile && query.length > 0 ? (
              <Sidebar>
                <SearchResults />
              </Sidebar>
            ) : (
              children
            )}
          </Flex>
          {rightSidebar && !isMobile && <Sidebar>{rightSidebar}</Sidebar>}
        </Flex>
      </Flex>
    </>
  );
}
