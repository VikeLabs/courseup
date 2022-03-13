import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useSwipeable } from 'react-swipeable';

import { Term } from 'lib/fetchers';

import { Page } from 'common/layouts/Page';
import { Courses } from 'common/layouts/sidebar/variants/Courses';

import { SchedulerSidebar } from './components/SchedulerSidebar';
import { SchedulerContainer } from './containers/SchedulerContainer';

export function Scheduler(): JSX.Element {
  const { term } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => (isOpen ? onClose() : onOpen()),
    onSwipedLeft: () => (isOpen ? onClose() : onOpen()),
  });

  return (
    <Page
      title="Scheduler"
      leftSidebar={<Courses term={term as Term} />}
      rightSidebar={<SchedulerSidebar term={term} />}
    >
      <Box {...handlers} w="100%">
        {/* {isOpen ? <Courses term={term as Term} /> : <SchedulerContainer />} */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Box w="100%" h="100%">
                <Courses term={term as Term} />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <SchedulerContainer />
      </Box>
    </Page>
  );
}
