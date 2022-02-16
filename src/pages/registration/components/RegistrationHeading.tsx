import { Container, Divider, Flex, Heading, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { IoCopyOutline } from 'react-icons/io5';
import { useParams } from 'react-router';

import { getReadableTerm } from 'lib/utils/terms';

export function RegistrationHeading() {
  const { term } = useParams();

  return (
    <Container alignItems="center" maxW="container.xl">
      <Flex direction={{ md: 'row', base: 'column' }} justifyContent="space-between">
        <Heading fontSize={{ base: '1.5rem', md: '2.15rem' }} as="h1" marginBottom={{ base: '1rem', md: '0' }}>
          Registration for {`${getReadableTerm(term)}`}
        </Heading>
        <Button
          colorScheme="blue"
          rightIcon={<HiLink />}
          as="a"
          href="https://www.uvic.ca/tools/student/registration/add-or-drop-classes/index.php"
          target="_blank"
        >
          UVic Registration Page
        </Button>
      </Flex>
      <Divider my="4" />
      <Flex>
        <Text w="100%" textAlign="left">
          UVic offers a quick and easy way to register for a course using the Course Reference Number (CRN). Follow the
          given steps below to register in your chosen course sections:{' '}
          <OrderedList mt="1" ml="6" mb="1">
            <ListItem>
              Click the{' '}
              <Text as="span" fontWeight="bold">
                UVic Registration Page
              </Text>{' '}
              button.
            </ListItem>
            <ListItem>Sign in to UVic with your NetLink ID.</ListItem>
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
              and paste the CRNs into the{' '}
              <Text as="span" fontWeight="bold">
                Add Classes Worksheet
              </Text>{' '}
              input fields on the UVic's page.
            </ListItem>
            <ListItem>
              Hit{' '}
              <Text as="span" fontWeight="bold">
                Submit Changes
              </Text>
              , and you’re registered!
            </ListItem>
          </OrderedList>
          For more information, visit UVic's guide on "
          <Text as="span" color="blue.500" fontWeight="light">
            <Text
              as="a"
              href="https://www.uvic.ca/students/undergraduate/course-registration/index.php"
              target="_blank"
              _hover={{ color: 'blue' }}
            >
              Course registration
            </Text>
          </Text>
          ."
        </Text>
      </Flex>
    </Container>
  );
}
