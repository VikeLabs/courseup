import { useState } from 'react';

import useWindowDimensions from '../../shared/hooks/useWindowDimensions';

import { MobileContext } from './context';

export function MobileProvider({ children }: React.PropsWithChildren<Record<never, never>>): JSX.Element | null {
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(width < 600);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <MobileContext.Provider value={{ isMobile, setIsMobile, isClicked, setIsClicked }}>
      {children}
    </MobileContext.Provider>
  );
}
