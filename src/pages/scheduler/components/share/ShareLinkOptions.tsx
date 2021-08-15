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
  const { hasCopied, onCopy } = useClipboard(slug);
  const toast = useToast();
  const mode = useDarkMode();

  useEffect(() => {
    hasCopied && toast({ status: 'success', title: `Copied the link to clipboard!`, duration: 3000 });
  }, [slug, hasCopied, toast]);

  return (
    <HStack justify="space-between" p="5px" borderWidth="1px" borderColor={mode('gray.300', 'gray.600')}>
      <HStack justify="center" flexGrow={4}>
        {isSmallScreen ? <Icon boxSize="1.25em" as={HiLink} /> : undefined}
        <Input id="timetable_slug" value={slug} variant="filled" isReadOnly />
      </HStack>
      <Button size={isSmallScreen ? 'sm' : 'md'} colorScheme="blue" leftIcon={<CopyIcon />} onClick={onCopy}>
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
