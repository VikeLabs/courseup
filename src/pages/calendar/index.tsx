import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { Content } from '../../app/index';
import { Term } from '../../shared/fetchers';
import { SidebarTemplate } from '../../shared/SidebarTemplate';

export function Calendar(): JSX.Element {
  const { term } = useParams();
  const [searchParams] = useSearchParams();

  const pid = searchParams.get('pid');

  return (
    <SidebarTemplate route="calendar" term={term as Term}>
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
    </SidebarTemplate>
  );
}
