import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Content } from '../../app/index';
import { getCurrentTerm } from '../../app/shared/utils/terms';
import { Term } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';
import { useSessionStorage } from '../../shared/useStorage';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());

  const navigate = useNavigate();

  const pid = searchParams.get('pid');

  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else {
      navigate(`/calendar/${savedTerm}`, { replace: true });
    }
  }, [navigate, term, savedTerm, setSavedTerm]);

  return (
    <SidebarTemplate route="calendar" term={term as Term}>
      <Flex minW="80%" overflow="auto" justifyContent="center" boxShadow="lg" zIndex={56}>
        {pid ? (
          <Content term={term as Term} />
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
    </SidebarTemplate>
  );
}
