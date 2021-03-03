import { Box } from '@chakra-ui/layout';
// import StyledHeader from './Header.styles';

export interface HeaderProps {
  /**
   * Content
   * Subject to change
   */
  content?: string;
}

/**
 * Primary UI component for content
 */
export function Header({ content }: HeaderProps) {
  return <Box as="header">{content}</Box>;
}
