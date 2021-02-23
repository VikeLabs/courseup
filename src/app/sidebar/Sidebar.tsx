import React from 'react';
// import StyledHeader from './Header.styles';


export interface SidebarProps {
  /**
   * Content
   * Subject to change
   */
  content?: string;
}

/**
 * Primary UI component for content
 */
export const Sidebar: React.FC<SidebarProps> = ({
  content
}) => {
  return (
    <div>
      {content}
    </div>
  )
};