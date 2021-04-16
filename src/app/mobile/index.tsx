import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { SelectedCourse } from '../../calendar';
import { Term } from '../../fetchers';
import { useMobileContext } from '../context/mobile';
import { TermContext } from '../context/TermContext';
import { Content, Feedback } from '../index';
import { getCurrentTerm } from '../shared/utils/terms';
import { SidebarContainer } from '../sidebar/containers/SidebarContainer';

import { HeaderMobile } from './header/HeaderMobile';
import { HeaderSearch } from './header/HeaderSearch';

export function MobileView(): JSX.Element {
  const [term, setTerm] = useState(getCurrentTerm());
  const [query, setQuery] = useState('');

  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse>();

  const { isClicked, setIsClicked } = useMobileContext();

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  const handleSidebar = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked, setIsClicked]);

  return (
    <TermContext.Provider value={{ term, setTerm }}>
      {isClicked ? (
        <Flex h="100vh" direction="column">
          <HeaderSearch handleSidebar={handleSidebar} onSearchChange={handleSearchChange} />
          <Box grow={1} overflow="scroll" height="100%">
            <SidebarContainer
              term={term as Term}
              onSelectedCourseChange={setSelectedCourse}
              selectedCourse={selectedCourse}
              searchQuery={query}
            />
          </Box>
        </Flex>
      ) : (
        <Flex h="100vh" direction="column">
          <HeaderMobile handleSidebar={handleSidebar} />
          <Box grow={1} overflow="hidden" height="100%">
            <Flex color="white" height="100%">
              <Flex minW="80%" overflow="auto" justifyContent="center" height="100%" boxShadow="lg" zIndex={56}>
                {selectedCourse ? (
                  <Content term={term as Term} selectedCourse={selectedCourse} />
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
      )}
    </TermContext.Provider>
  );
}
