import { Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { SchedulerContainer, SchedulerSidebar } from '../../app';
import { Term } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';

export function Scheduler(): JSX.Element {
  const { term } = useParams();

  return (
    <SidebarTemplate title="Scheduler" term={term as Term}>
      <Flex flexGrow={1}>
        <SchedulerContainer />
        <SchedulerSidebar term={term} />
      </Flex>
    </SidebarTemplate>
  );
}
