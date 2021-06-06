import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/layout';
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

      <Divider my="5" />
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
        of your desired sections. By clicking the{' '}
        <Text as="span" fontWeight="bold">
          UVic Registration Page
        </Text>{' '}
        button, you will be taken to the page to do so in a new tab. From this page, once you’ve selected a term, you
        can quickly{' '}
        <Text as="span" fontWeight="bold">
          {' '}
          copy <Icon as={IoCopyOutline} />{' '}
        </Text>
        the{' '}
        <Text
          as="span"
          title="The 5-digit identifier of a section"
          textDecoration="underline"
          cursor="help"
          style={{ textDecorationStyle: 'dotted' }}
        >
          CRNs
        </Text>{' '}
        provided and paste them in the designated areas on UVic’s page, select{' '}
        <Text as="span" fontWeight="bold">
          Submit Changes
        </Text>
        , and you’re registered!
      </Text>
    </Box>
  );
}
