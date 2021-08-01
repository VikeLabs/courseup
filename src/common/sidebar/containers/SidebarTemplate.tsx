import { useEffect, PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';

import { Term } from 'lib/fetchers';
import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { getCurrentTerm } from 'lib/utils';

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
  query: string;
}

export function SidebarTemplate({
  children,
  term,
  title,
  query,
}: PropsWithChildren<SidebarTemplateProps>): JSX.Element {
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();

  const route = location.pathname.split('/')[1];

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
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term} searchQuery={query} />
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
