import { IconButton } from '@chakra-ui/button';
import { AiFillGithub } from 'react-icons/ai';

export function GitHubButton(): JSX.Element {
  return (
    <IconButton
      as="a"
      href="https://github.com/VikeLabs/courseup"
      target="_blank"
      size="sm"
      colorScheme="none"
      fontSize="35px"
      isRound
      aria-label="Go to GitHub Repo"
      icon={<AiFillGithub />}
    />
  );
}
