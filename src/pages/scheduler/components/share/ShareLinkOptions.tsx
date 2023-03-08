import { useEffect } from 'react';

import { CopyIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, Icon, Input, useClipboard, useToast } from '@chakra-ui/react';
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

import { useDarkMode } from 'lib/hooks/useDarkMode';

type SocialMediaButtonsProps = {
  shareLink: string;
};

const SocialMediaButtons = ({ shareLink }: SocialMediaButtonsProps) => {
  return (
    <HStack justify="center">
      <EmailShareButton url={shareLink}>
        <EmailIcon size={50} round />
      </EmailShareButton>
      <FacebookShareButton url={shareLink}>
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <TelegramShareButton url={shareLink}>
        <TelegramIcon size={50} round />
      </TelegramShareButton>
      <WhatsappShareButton url={shareLink}>
        <WhatsappIcon size={50} round />
      </WhatsappShareButton>
      <TwitterShareButton url={shareLink}>
        <TwitterIcon size={50} round />
      </TwitterShareButton>
    </HStack>
  );
};

type CopyLinkUrlProps = {
  isSmallScreen: boolean;
  shareLink: string;
  loading: boolean;
};

const CopyLinkUrl = ({ isSmallScreen, shareLink, loading }: CopyLinkUrlProps) => {
  const { hasCopied, onCopy } = useClipboard(shareLink);
  const toast = useToast();
  const mode = useDarkMode();

  useEffect(() => {
    hasCopied && toast({ status: 'success', title: `Copied the link to clipboard!`, duration: 3000 });
  }, [shareLink, hasCopied, toast]);

  return (
    <HStack justify="space-between" p="5px" borderWidth="1px" borderColor={mode('gray.300', 'gray.600')}>
      <HStack justify="center" flexGrow={4}>
        {isSmallScreen ? <Icon boxSize="1.25em" as={HiLink} /> : undefined}
        <Input id="timetable_slug" value={loading ? 'Loading...' : shareLink} variant="filled" isReadOnly />
      </HStack>
      <Button
        disabled={loading}
        size={isSmallScreen ? 'sm' : 'md'}
        colorScheme="blue"
        leftIcon={<CopyIcon />}
        onClick={onCopy}
      >
        Copy
      </Button>
    </HStack>
  );
};

type ShareLinkOptionsProps = {
  isSmallScreen: boolean;
  slug: string;
  loading: boolean;
};

export function ShareLinkOptions({ isSmallScreen, slug, loading }: ShareLinkOptionsProps): JSX.Element {
  const shareLink = window.location.origin + '/s/' + slug;

  return (
    <>
      <Heading size="sm"> Share this link via </Heading>
      <SocialMediaButtons shareLink={shareLink} />
      <Heading size="sm"> Or copy link </Heading>
      <CopyLinkUrl isSmallScreen={isSmallScreen} shareLink={shareLink} loading={loading} />
    </>
  );
}
