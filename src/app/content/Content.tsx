import React from 'react';

import { useGetCourses } from '../../fetchers';

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
export const Content: React.FC<ContentProps> = ({ content }) => {
  const { data } = useGetCourses({ term: '202101' });
  return <div>{data && data.map((e) => <p key={e.pid}>{e.title}</p>)}</div>;
};
