import { Box, Center, ChakraProvider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { TermContext } from './app/context/TermContext';
import { Header, Content, SidebarContainer, Feedback } from './app/index';
import { getCurrentTerm } from './app/shared/utils/terms';
import { Term } from './fetchers';

export function App(): JSX.Element | null {
  const [term, setTerm] = useState(getCurrentTerm());
  const [pid, setPid] = useState<string>();

  return (
    <ChakraProvider portalZIndex={999}>
      <TermContext.Provider value={{ term, setTerm }}>
        <Flex h="100vh" direction="column">
          <Header />
          <Box grow={1} overflow="hidden" height="100%">
            <Flex color="white" height="100%">
              <SidebarContainer term={term as Term} pid={pid || ''} setPid={setPid} />
              <Flex minW="80%" overflow="auto" justifyContent="center" height="100%" boxShadow="lg" zIndex={56}>
                {pid ? (
                  <Content term={term as Term} pid={pid} />
                ) : (
                  <Center p="10">
                    <VStack>
                      <Heading color="black">Explore Courses</Heading>
                      <Text color="gray">
                        Select a subject and then a course to start viewing course details and section information.
                      </Text>
                    </VStack>
                  </Center>
                )}
              </Flex>
            </Flex>
            <Box pos="absolute" bottom="0" right="0" zIndex={999} p={25}>
              <Feedback />
            </Box>
          </Box>
        </Flex>
      </TermContext.Provider>
    </ChakraProvider>
  );
}
