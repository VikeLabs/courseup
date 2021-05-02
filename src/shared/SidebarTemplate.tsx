import { Flex, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router';

import { Header, Feedback } from '../app';
import { getCurrentTerm } from '../app/shared/utils/terms';
import { ContentSidebar } from '../app/sidebar';

import { Term } from './fetchers';
import { useSessionStorage } from './hooks/storage/useSessionStorage';

export interface SidebarTemplateProps {
  title: string;
  children: JSX.Element;
  term: Term;
}

export function SidebarTemplate({ children, term, title }: SidebarTemplateProps): JSX.Element {
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
    <Flex h="100vh" direction="column">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term} searchQuery={query} />
        <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
          {children}
        </Flex>
        <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
          <Feedback />
        </Box>
      </Flex>
    </Flex>
  );
}
