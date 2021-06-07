import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { DiGithubBadge } from 'react-icons/di';

export function ExternalLinks(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(!isOpen);
    window.open('https://github.com/VikeLabs/courseup');
  };
  return <IconButton aria-label="GitHub" icon={<DiGithubBadge />} borderRadius="50%" name="github" onClick={open} />;
}
