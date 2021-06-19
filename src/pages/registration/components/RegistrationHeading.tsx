import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Container, Divider, Flex, Heading, HStack, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import { Link as Links, Button, Icon } from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { IoCopyOutline } from 'react-icons/io5';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { getReadableTerm } from 'lib/utils';

export function RegistrationHeading() {
  const { term } = useParams();

  return (
    <Container alignItems="center" maxW="container.xl">
      <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
        <HStack>
          <Heading
            fontSize={{ base: '1.5rem', md: '2.15rem' }}
            as="h1"
            color="black"
            marginBottom={{ base: '1rem', md: '0' }}
          >
            <Links as={Link} to={`/scheduler/${term}`} display="flex" alignItems="center">
              <ChevronLeftIcon
                fontSize="35px"
                colorScheme="white"
                color="black"
                verticalAlign="bottom"
                aria-label="back"
              />
              Registration for {`${getReadableTerm(term)}`}
            </Links>
          </Heading>
        </HStack>
        <HStack>
          <Button
            colorScheme="blue"
            width="100%"
            rightIcon={<HiLink />}
            as="a"
            href="https://www.uvic.ca/tools/student/registration/add-or-drop-classes/index.php"
            target="_blank"
          >
            UVic Registration Page
          </Button>
        </HStack>
      </Flex>
      <Divider my="4" />
      <Flex>
        <Text w="100%" textAlign="left">
          UVic offers a quick way to register for courses with the{' '}
          <Text
            as="span"
            title="The 5-digit identifier of a section"
            textDecoration="underline"
            cursor="help"
            style={{ textDecorationStyle: 'dotted' }}
          >
            CRNs
          </Text>{' '}
          of your desired sections. Follow the given steps to register in the sections chosen and saved on the timetable
          builder:{' '}
          <OrderedList mt="1" ml="6">
            <ListItem>
              Click the{' '}
              <Text as="span" fontWeight="bold">
                UVic Registration Page
              </Text>{' '}
              button.
            </ListItem>
            <ListItem>Sign in to UVic with your netlink ID.</ListItem>
            <ListItem>
              Select the appropriate term and hit{' '}
              <Text as="span" fontWeight="bold">
                Submit
              </Text>{' '}
              to take you to the{' '}
              <Text as="span" fontWeight="bold">
                Add or drop classes page.
              </Text>
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                {' '}
                Copy <Icon as={IoCopyOutline} />{' '}
              </Text>{' '}
              and paste the{' '}
              <Text
                as="span"
                title="The 5-digit identifier of a section"
                textDecoration="underline"
                cursor="help"
                style={{ textDecorationStyle: 'dotted' }}
              >
                CRNs
              </Text>{' '}
              below into the input fields on UVic's page.
            </ListItem>
            <ListItem>
              Hit{' '}
              <Text as="span" fontWeight="bold">
                Submit Changes
              </Text>
              , and you’re registered!
            </ListItem>
          </OrderedList>
        </Text>
      </Flex>
    </Container>
  );
}
