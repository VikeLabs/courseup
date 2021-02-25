import React from 'react';
import { useGetAllCourses } from '../../fetchers';

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
  const { data } = useGetAllCourses({});
  return (
    <div>
      {data && data.map((e) => (<p key={e.pid}>{e.title}</p>))}
    </div>
  )
};