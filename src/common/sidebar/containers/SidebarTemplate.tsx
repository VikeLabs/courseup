import { useState, useEffect, PropsWithChildren } from 'react';

import { Flex, Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';

import { Term } from 'lib/fetchers';
import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils';

import { Header } from 'common/header';

import { ContentSidebar } from '..';

export interface SidebarTemplateProps {
  /**
   * Title for react-helmet
   */
  title: string;
  /**
   * Term Selected
   * Determines what term the subjects and courses are from
   */
  term: Term;
}

export function SidebarTemplate({ children, term, title }: PropsWithChildren<SidebarTemplateProps>): JSX.Element {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();

  const route = location.pathname.split('/')[1];

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else {
      navigate(`/${route}/${savedTerm}`, { replace: true });
    }
  }, [navigate, term, route, savedTerm, setSavedTerm]);

  return (
    <Flex h="100vh" direction="column" overflowX="hidden">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term} searchQuery={query} />
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
