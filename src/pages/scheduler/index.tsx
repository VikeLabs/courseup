import { Flex } from '@chakra-ui/layout';
import { useParams } from 'react-router';

import { SchedulerContainer, SchedulerSidebar } from '../../app';
import { Term, useSections } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';

export function Scheduler(): JSX.Element {
  const term = '202105';
  const subject = 'ECE';
  const code = '310';
  const { data: scehdulelisting } = useSections({ term, queryParams: { subject, code } });

  return (
    <SidebarTemplate title="Scheduler" term={term as Term}>
      <Flex flexGrow={1}>
        {scehdulelisting && (
          <SchedulerContainer
            calendarEvents={(() => {
              const x = new Array();
              x.push({
                subject: subject,
                code: code,
                color: '#F58400',
                textColor: 'white',
                sectionCode: scehdulelisting[0].sectionCode,
                meetingTime: scehdulelisting[0].meetingTimes[0],
              });
              return x;
            })()}
          />
        )}
        <SchedulerSidebar />
      </Flex>
    </SidebarTemplate>
  );
}
