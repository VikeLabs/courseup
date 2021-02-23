import React from 'react';
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
export const Header: React.FC<HeaderProps> = ({
  content
}) => {
  return (
    <div>
      {content}
    </div>
  )
};