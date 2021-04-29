import { Flex, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Header, Feedback } from '../app';
import { getCurrentTerm } from '../app/shared/utils/terms';
import { ContentSidebar } from '../app/sidebar';

import { Term } from './fetchers';

export interface SidebarTemplateProps {
  route: String;
  children: JSX.Element;
  term: Term;
}

export function SidebarTemplate({ children, term }: SidebarTemplateProps): JSX.Element {
  const [query, setQuery] = useState('');

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  return (
    <Flex h="100vh" direction="column">
      <Header onSearchChange={handleSearchChange} />
      <Flex grow={1} overflow="hidden">
        <ContentSidebar term={term} searchQuery={query} />
        {children}
        <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
          <Feedback />
        </Box>
      </Flex>
    </Flex>
  );
}
