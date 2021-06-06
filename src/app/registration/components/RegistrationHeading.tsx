import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, HStack, ListItem, OrderedList, Text } from '@chakra-ui/layout';
import { Button, Icon, IconButton } from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { IoCopyOutline } from 'react-icons/io5';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { getReadableTerm } from '../../shared/utils/terms';

export function RegistrationHeading() {
  const { term } = useParams();

  return (
    <Box alignItems="center">
      <HStack justifyContent="space-between">
        <HStack>
          <IconButton
            icon={<ChevronLeftIcon fontSize="35px" />}
            colorScheme="white"
            color="black"
            aria-label="back"
            as={Link}
            to={`/scheduler/${term}`}
          />
          <Heading size="xl" as="h1" whiteSpace="pre" color="black">
            Registration for {`${getReadableTerm(term)}`}
          </Heading>
        </HStack>
        <Button
          colorScheme="blue"
          rightIcon={<HiLink />}
          as="a"
          href="https://www.uvic.ca/tools/student/registration/add-or-drop-classes/index.php"
          target="_blank"
        >
          UVic Registration Page
        </Button>
      </HStack>
      <Divider my="3" />
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
        <OrderedList mt="1">
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
    </Box>
  );
}
