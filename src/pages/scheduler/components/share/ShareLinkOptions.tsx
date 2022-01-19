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
  share_link: string;
};

const SocialMediaButtons = ({ share_link }: SocialMediaButtonsProps) => {
  return (
    <HStack justify="center">
      <EmailShareButton children={<EmailIcon size={50} round />} url={share_link} />
      <FacebookShareButton children={<FacebookIcon size={50} round />} url={share_link} />
      <TelegramShareButton children={<TelegramIcon size={50} round />} url={share_link} />
      <WhatsappShareButton children={<WhatsappIcon size={50} round />} url={share_link} />
      <TwitterShareButton children={<TwitterIcon size={50} round />} url={share_link} />
    </HStack>
  );
};

type CopyLinkUrlProps = {
  isSmallScreen: boolean;
  share_link: string;
  loading: boolean;
};

const CopyLinkUrl = ({ isSmallScreen, share_link, loading }: CopyLinkUrlProps) => {
  const { hasCopied, onCopy } = useClipboard(share_link);
  const toast = useToast();
  const mode = useDarkMode();

  useEffect(() => {
    hasCopied && toast({ status: 'success', title: `Copied the link to clipboard!`, duration: 3000 });
  }, [share_link, hasCopied, toast]);

  return (
    <HStack justify="space-between" p="5px" borderWidth="1px" borderColor={mode('gray.300', 'gray.600')}>
      <HStack justify="center" flexGrow={4}>
        {isSmallScreen ? <Icon boxSize="1.25em" as={HiLink} /> : undefined}
        <Input id="timetable_slug" value={loading ? 'Loading...' : share_link} variant="filled" isReadOnly />
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
  const share_link = 'https://' + window.location.hostname + '/s/' + slug;

  return (
    <>
      <Heading size="sm"> Share this link via </Heading>
      <SocialMediaButtons share_link={share_link} />
      <Heading size="sm"> Or copy link </Heading>
      <CopyLinkUrl isSmallScreen={isSmallScreen} share_link={share_link} loading={loading} />
    </>
  );
}
