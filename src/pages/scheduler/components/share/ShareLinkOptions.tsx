import { CopyIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, Icon, Input, useToast } from '@chakra-ui/react';
import { HiLink } from 'react-icons/hi';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

type SocialMediaButtons_Props = {
  slug: string;
};

const SocialMediaButtons = ({ slug }: SocialMediaButtons_Props) => {
  return (
    <HStack justify="center">
      <EmailShareButton children={<EmailIcon size={50} round={true} />} url={slug} />
      <FacebookShareButton children={<FacebookIcon size={50} round={true} />} url={slug} />
      <TelegramShareButton children={<TelegramIcon size={50} round={true} />} url={slug} />
      <WhatsappShareButton children={<WhatsappIcon size={50} round={true} />} url={slug} />
      <TwitterShareButton children={<TwitterIcon size={50} round={true} />} url={slug} />
    </HStack>
  );
};

type CopyLinkUrl = {
  isSmallScreen: boolean;
  slug: string;
};

const CopyLinkUrl = ({ isSmallScreen, slug }: CopyLinkUrl) => {
  const toast = useToast();
  return (
    <HStack justify="space-between" padding="5px" borderWidth="1px" borderColor="gray.300">
      <HStack justify="center" flexGrow={4}>
        {isSmallScreen ? <Icon boxSize="1.25em" as={HiLink} /> : undefined}
        <Input id="timetable_slug" value={slug} variant="filled" isReadOnly={true} />
      </HStack>
      <Button
        size={isSmallScreen ? 'sm' : 'md'}
        colorScheme="blue"
        leftIcon={<CopyIcon />}
        onClick={() => {
          var el = document.getElementById('timetable_slug') as HTMLInputElement;
          el.focus();
          el.select();
          document.execCommand('copy');
          toast({
            title: 'Copied.',
            status: 'success',
            duration: 3000,
          });
        }}
      >
        Copy
      </Button>
    </HStack>
  );
};

type ShareLinkOptions_Props = {
  isSmallScreen: boolean;
  slug: string;
};

export function ShareLinkOptions({ isSmallScreen, slug }: ShareLinkOptions_Props): JSX.Element {
  return (
    <>
      <Heading size="sm"> Share this link via </Heading>
      <SocialMediaButtons slug={slug} />
      <Heading size="sm"> Or copy link </Heading>
      <CopyLinkUrl isSmallScreen={isSmallScreen} slug={slug} />
    </>
  );
}
