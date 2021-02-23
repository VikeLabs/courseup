import React from 'react';

export interface ContentProps {
  /**
   * Content
   * Subject to change
   */
  content?: string;
}

/**
 * Primary UI component for content
 */
export const Content: React.FC<ContentProps> = ({
  content
}) => {
  return (
    <div>
      {content}
    </div>
  )
};