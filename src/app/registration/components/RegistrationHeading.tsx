import { Box, Divider, Heading, Text } from '@chakra-ui/layout';
import { Button, Icon } from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import { IoCopyOutline } from 'react-icons/io5';
import { useParams } from 'react-router';

import { getReadableTerm } from '../../shared/utils/terms';

export function RegistrationHeading() {
  const { term } = useParams();

  return (
    <Box alignItems="center">
      <Heading mr="5" size="xl" as="h1" whiteSpace="pre" color="black">
        Registration for {`${getReadableTerm(term)}`}
      </Heading>
      <Divider my="5" />
      <Box textAlign="left" mb="5">
        <Text>
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
          of your desired sections. By clicking the button below, you will be taken to the page to do so in a new tab.
          From this page, once you’ve selected a term, you can quickly{' '}
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
      <Button
        colorScheme="blue"
        rightIcon={<HiLink />}
        as="a"
        href="https://www.uvic.ca/tools/student/registration/add-or-drop-classes/index.php"
        target="_blank"
      >
        UVic Registration Page
      </Button>
      <Divider my="5" />
    </Box>
  );
}
