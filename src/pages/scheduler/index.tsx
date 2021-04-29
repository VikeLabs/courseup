import { Flex, Box } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Header, SchedulerContainer } from '../../app';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { ContentSidebar } from '../../app/sidebar';
import { Term } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';
import { useSessionStorage } from '../../shared/useStorage';

export function Scheduler(): JSX.Element {
  const { term } = useParams();
  const navigate = useNavigate();
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());

  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else {
      console.log(term);
      navigate(`/schedule/${savedTerm}`, { replace: true });
    }
  }, []);

  return (
    <SidebarTemplate route="schedule" term={'202101' as Term}>
      <Box flexGrow={1}>
        <SchedulerContainer />
      </Box>
    </SidebarTemplate>
  );
}
